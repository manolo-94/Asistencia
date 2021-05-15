import { Time } from "@angular/common";

 export interface Usario {
  // ? puede ser opcional
  avatar?: string;
  email?: string;
  username?: string;
  id?: number;
  password?: string;
}

export interface RespuestaEncuestas {
  encuestas: Encuesta[];
}

export interface Encuesta {
  nombre: string;
  descripcion: string;
  encuesta: string;
}

export interface Persona {
  id:number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  nombre_completo?: string;
  fecha_nacimiento?: string;
  edad?: number
}

export interface PersonaLN {
  nombre_completo: string;
}

export interface PersonasObject {
  count: number;
  next: string;
  previous?: any;
  results: PersonaSeccion[];
}

export interface PersonaSeccion {
  id?: number,
  id_persona?: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  nombre_completo?: string;
  direccion?: string;
  fecha_nacimiento?: string;
  edad?: number;
  seccion?: number;
  municipio?: number;
  localidad?: number;
  comisaria?: string;
  voto?: boolean;
  fecha_voto?: Date;
  hora_voto?: Time;
  fecha_creacion?: Date;
  hora_creacion?: Time;
}