import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { PersonaLN, PersonasObject } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject = null;
  private personasObject: PersonasObject[] = []
  private personas: PersonaLN[] = [];
  token: string = null;

  constructor( private platform:Platform,
               private sqlite:SQLite,
               private http: HttpClient,
               private storage: Storage) {}

  createDataBase(){
    this.platform.ready().then(() => {
      this.sqlite.create({
      name: 'db_electoral.db',
      location: 'default'
      })
      .then((db:SQLiteObject) => {
        this.database = db;
        this.createTables()
      })
      .catch((e) => {
        console.log('Error al crear la base de datos ' + e);
      });
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  createTables(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS personas(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              id_persona INTERGER,
              nombre VARCHAR(255), 
              apellido_paterno VARCHAR(255),
              apellido_materno VARCHAR(255),
              nombre_completo VARCHAR(255),
              direccion VARCHAR(255),
              fecha_nacimiento VARCHAR(255),
              edad INTERGER,
              seccion INTERGER,
              municipio INTERGER,
              localidad INTERGER,
              comisaria VARCHAR(255),
              voto INTEGER NOT NULL DEFAULT 0,
              fecha_voto TEXT,
              hora_voto TEXT,
              fecha_creacion timestamp DATE DEFAULT (datetime('now','localtime')))`;
    return this.database.executeSql(sql, []);

  }

  async downloadPersonas(newURL:string){
    
    this.token = await this.storage.get('token') || null;
    
    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });
    if(newURL != null){
      return this.http.get<PersonasObject>(`${newURL}`,{headers});
    }else{
      return this.http.get<PersonasObject>(`${URL}/personas/persona/seccion/`,{headers});
    }
              //  .subscribe(resp => {
              //   console.log(resp.next);
              //   console.log(resp.previous);
              //   console.log(resp.results);
              //   if(resp.next != null){

              //   }
              //   },(err)=>{
              //    console.log(err['error']['error'])
              //   });

  }

  addPerson(persona:PersonaLN){
    let data = persona;
    let sql = `INSERT INTO personas(
              id_persona, 
              nombre, 
              apellido_paterno, 
              apellido_materno, 
              nombre_completo, 
              direccion, 
              fecha_nacimiento, 
              edad, 
              seccion, 
              municipio, 
              localidad, 
              comisaria, 
              voto, 
              fecha_voto, 
              hora_voto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return this.database.executeSql(sql,[data]);
    // return this.database.executeSql('INSERT INTO '+this.tables.personas+' (nombre_completo) VALUES (?)', data);
    // .then(resp => {
    //   console.log(resp);
    // })
    // .catch(error => {
    //   Promise.reject(error);
    // });
  }

  getPeople(){
    let sql = 'SELECT * FROM personas ORDER BY nombre_completo ASC'
    return this.database.executeSql(sql, [])
           .then(resp => {
              let personas = [];
              for(let i = 0; i < resp.rows.length; i++){
                personas.push(resp.rows.item(i));
              }
              return Promise.resolve(personas);
           })
           .catch(error=> {
             Promise.reject(error);
           });
    }
    
}