import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  persona: Persona[] = [];

  token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage) { }

async  buscarPersona(nombre:string){

    this.token = await this.storage.get('token') || null;
    
    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });
    
    const data = nombre;
    console.log('yo escribi: '+data)
    // this.http.get(`${URL}/personas/persona/search/?search_vector=`,data, {headers})
    // this.http.get(`${URL}/personas/persona/search/?search_vector=`,{params: new HttpParams({ fromObject:data}), headers:{Authorization:'Token ' + this.token} })
    return this.http.get<Persona[]>(`${URL}/personas/persona/search/?search_vector=`+data,{headers});
            //  .subscribe(resp => {
            //    console.log(resp);
            //  },(err)=>{
            //   console.log(err['error']['error'])
            //  });

  }


}
