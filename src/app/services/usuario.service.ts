import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';


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
        this.guardarToken(resp['token']);
          resolve(true)
      }, (err) => {
        this.token = null;
          this.storage.clear();
          resolve(false);
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


  async guardarToken(token:string){
    this.token = token;
    await this.storage.set('token',token);
  }

}
