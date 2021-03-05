import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Encuesta } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  encuestas: Encuesta[] = [];

  token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage ) { }

  async getEncuestas(){

    this.token = await this.storage.get('token') || null;
    
      const headers = new HttpHeaders({
        'Authorization': 'Token ' + this.token
      });
    
      return this.http.get<Encuesta>(`${URL}/encuestas/`, { headers })
             /* .subscribe(resp => {
               this.encuestas.push(resp)
               console.log(resp[0].nombre);
               console.log(resp);
             });  */  

  }

}
