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
  persona_id?: number;
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

export interface Voto {
  id: number;
  guardado: boolean;
  error?: any;
}

export interface personaVoto {
  id?:number,
  id_persona?:number,
  nombre_completo?:string,
  status?:boolean,
  fecha_creacion?:Date
}

export interface Casilla {
  casilla: number;
  abierta: boolean;
  error?: any;
}

export interface Incidencia {
  procesado: boolean;
  error?: any;
  id: number;
}

export interface Resultados  {
  procesado: boolean;
  error?: any;
  id: number;
}

export interface PromovidoNoLN {
  procesado: boolean;
  error?: any;
  id: number;
}