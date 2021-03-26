import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  personas: Persona[] = [];

  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage) { }

async  buscarPersona(nombre:string){

    this.token = await this.storage.get('token') || null;
    
    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });

    const data = {nombre};

    this.http.post(`${URL}/personas/persona/search/?search_vector=`,data, {headers});

  }


}
