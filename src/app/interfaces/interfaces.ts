
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
