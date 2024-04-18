import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { viajeSchema } from "@/schemas";

export const viajesRouter = createTRPCRouter({
  getAllViajes: publicProcedure.query(async ({ ctx }) => {
    const viajes = await ctx.prisma.viaje.findMany({
      include: {
        ruta: true,
        bus: true,
      },
    });
    return {
      status: "success",
      response: viajes,
    };
  }),

  getConductoresByViajeId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const conductores = await ctx.prisma.conductor.findMany({
          where: { viajeId: input.id },
        });
        return {
          status: "success",
          response: conductores,
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al obtener los conductores",
        };
      }
    }),

  getBoletosByViajeId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const boletos = await ctx.prisma.boleto.findMany({
          where: { viajeId: input.id },
        });
        return {
          status: "success",
          response: boletos,
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al obtener los boletos",
        };
      }
    }),

  //TODO: It seems like the TIMEZONE is not being WORKING we are 5 hours ahead
  getViajesForToday: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
      const viajesDiarios = await ctx.prisma.viaje.findMany({
        where: {
          salida: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: {
          ruta: true,
          bus: true,
        },
      });
      return {
        status: "success",
        response: viajesDiarios,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Error al obtener los viajes",
      };
    }
  }),
  getViajeById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const viaje = await ctx.prisma.viaje.findUnique({
          where: { id: input.id },
          include: {
            bus: true,
          },
        });
        return {
          status: "success",
          response: viaje,
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al obtener el viaje",
        };
      }
    }),

  getViajesByRutaDestiny: publicProcedure
    .input(z.object({ destiny: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const viajes = await ctx.prisma.viaje.findMany({
          where: {
            ruta: {
              ciudadDestino: input.destiny,
            },
          },
          include: {
            ruta: true,
            bus: true,
          },
        });
        return {
          status: "success",
          response: viajes,
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al obtener los viajes",
        };
      }
    }),
  createViaje: publicProcedure
    .input(viajeSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.viaje.create({
          data: input,
        });
        return {
          status: "success",
          message: "Viaje creado exitosamente",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al crear el viaje",
        };
      }
    }),
  deleteViaje: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        await ctx.prisma.viaje.delete({ where: { id: input.id } });
        return {
          status: "success",
          message: "Viaje eliminado exitosamente",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al eliminar el viaje",
        };
      }
    }),
  updateViaje: publicProcedure
    .input(viajeSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.viaje.update({
          where: { id: input.id },
          data: input,
        });
        return {
          status: "success",
          message: "Viaje actualizado exitosamente",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al actualizar el viaje",
        };
      }
    }),
});
