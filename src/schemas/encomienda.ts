import { z } from "zod";

const encomiendaSchema = z.object({
  remitenteDni: z.string(),
  usuarioId: z.string(),
  destinatarioDni: z.string(),
  codigoRastreo: z.string(),
  destinatarioNombres: z.string(),
  destinatarioApellidos: z.string(),
  remitenteNombres: z.string(),
  remitenteApellidos: z.string(),
  precio: z.number().nonnegative().min(1),
  viajeId: z.string(),
  empresa: z.string().optional(),
  ruc: z.string().optional(),
  fechaEnvio: z.date(),
  factura: z.boolean(),
  pagado: z.boolean(),
  descripcion: z.string(),
  serie: z.enum([
    "EAG001",
    "EAG002",
    "EAG003",
    "EAG004",
    "EAG005",
    "EAG006",
    "EAG007",
    "EAG008",
    "EAG009",
    "EAG010",
  ]),
});

export default encomiendaSchema;
