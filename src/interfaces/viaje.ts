export interface Viaje {
  id_viaje: number;
  id_bus: number;
  id_conductor_principal: number;
  id_conductor_soporte: number;
  id_ruta: number;
  fecha_salida: Date;
  estado: "activo" | "inactivo" | null;
}
