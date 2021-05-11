
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