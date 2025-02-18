import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { boletoSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const boletosRouter = createTRPCRouter({
  getAllBoletos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.boleto.findMany({
      include: {
        viaje: {
          include: {
            ruta: true,
            usuario: {
              select: { sede: true },
            },
          },
        },
      },
      orderBy: { fechaRegistro: "desc" },
    });
  }),
  getCountOfMonthlyBoletos: publicProcedure.query(async ({ ctx }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const result = await ctx.prisma.boleto.count({
      where: {
        estado: "PAGADO",
        fechaRegistro: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    });

    return result;
  }),
  getMonthlyBoletos: publicProcedure.query(async ({ ctx }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const data = await ctx.prisma.boleto.findMany({
      where: {
        fechaRegistro: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    });
    return data;
  }),

  getCountOfBoletosInLatest6Months: publicProcedure.query(async ({ ctx }) => {
    try {
      const counts = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const boletos = await ctx.prisma.boleto.findMany({
          where: {
            fechaRegistro: {
              gte: startDate,
              lt: endDate,
            },
          },
        });
        counts.push(boletos.length);
      }
      return {
        status: "success",
        response: counts,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error al obtener el conteo de boletos",
      });
    }
  }),
  getLatestCodeOfBoleto: publicProcedure.query(async ({ ctx }) => {
    try {
      const boleto = await ctx.prisma.boleto.findFirst({
        orderBy: { id: "desc" },
        where: {
          usuario: {
            id: ctx.session?.user.id,
          },
        },
      });
      return {
        status: "success",
        response: boleto?.codigo,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error al obtener el código del último boleto generado",
      });
    }
  }),

  getBoletosById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const boleto = await ctx.prisma.boleto.findUnique({
          where: { id: input.id },
          include: {
            viaje: {
              include: {
                ruta: true,
              },
            },
            usuario: {
              include: {
                sede: true,
              },
            },
          },
        });
        return {
          status: "success",
          response: boleto,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener el boleto",
        });
      }
    }),

  getBoletosByStatusAndViajeId: publicProcedure
    .input(
      z.object({
        status: z.enum(["PAGADO", "RESERVADO", "DISPONIBLE"]),
        viajeId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const boletos = await ctx.prisma.boleto.findMany({
          where: { estado: input.status, viajeId: input.viajeId },
          include: {
            usuario: true,
          },
        });
        return {
          status: "success",
          response: boletos,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener los boletos",
        });
      }
    }),

  getBoletosByViaje: publicProcedure
    .input(z.object({ viajeId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const boletos = await ctx.prisma.boleto.findMany({
          where: { viajeId: input.viajeId },
          include: {
            viaje: {
              include: {
                ruta: true,
              },
            },
            usuario: true,
          },
        });
        return {
          status: "success",
          response: boletos,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener los boletos",
        });
      }
    }),
  deleteBoletosById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const boletoInfo = await ctx.prisma.boleto.findUnique({
        where: { id: input.id },
      });
      if (!boletoInfo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Boleto no encontrado",
        });
      }
      if (boletoInfo.usuarioId !== ctx.session?.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tiene permiso para eliminar este boleto",
        });
      }
      const boleto = await ctx.prisma.boleto.delete({
        where: { id: input.id },
      });

      if (!boleto) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Boleto no encontrado",
        });
      }
      return {
        status: "sucess",
        message: "Boleto eliminado",
      };
    }),
  createBoleto: publicProcedure
    .input(boletoSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.boleto.create({
          data: input,
        });
        return {
          status: "success",
          message: `Asiento : ${input.asiento} registrado `,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al registrar boleto",
        });
      }
    }),

  updateBoletoById: protectedProcedure
    .input(boletoSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.boleto.update({
          where: { id: input.id },
          data: input,
        });
        return {
          status: "success",
          message: "Boleto actualizado ",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al actualizar el boleto",
        });
      }
    }),
});
