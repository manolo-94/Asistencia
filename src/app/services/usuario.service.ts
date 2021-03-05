import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usario } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string = null;

  constructor( private http: HttpClient,
               private storage: Storage) { }

  login(username:string, password:string){

    const data = {username,password};

    return new Promise (resolve => {

      this.http.post(`${URL}/token/login/`, data)
      .subscribe(resp =>{
        console.log(resp)
        this.guardarToken(resp['auth_token']);
          resolve([true,'Bienvenido'])
      }, (err) => {
        console.log(err['error']['non_field_errors']);
        let msg = err['error']['non_field_errors']
        this.token = null;
        this.storage.clear();
        resolve([false,msg]);
      })
      /* .subscribe(resp => {
        console.log(resp)

        if (resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true)
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
 */
    })
    
  }

  registro(usuario: Usario){
    
    return new Promise(resolve => {
      this.http.post(`${URL}/users/`, usuario)
          .subscribe( resp => {
            console.log(resp);
            this.guardarToken(resp['auth_token']);
            resolve([true,'Usuario creado'])
          }, (err) => {
            console.log(err['error']['username']);
            let msg: string[] = err['error']['username'];
            this.token = null;
            this.storage.clear();
            resolve([false,msg]);
          });
    });

  }

  async guardarToken(token:string){
    /* debugger; */
    this.token = token;
    await this.storage.set('token',token);
  }

}
