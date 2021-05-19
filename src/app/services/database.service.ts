import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { PersonaLN, PersonasObject, PersonaSeccion } from '../interfaces/interfaces';
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

  private personaSeccion: PersonaSeccion[] = [];

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
        
        // this.deleteConfigDatabase();

        this.createTablePersonas();
        this.createTablePersonasFTS();
        this.createTriggerInsertFTS();
        this.createTriggerDeleteFTS();
        this.createTriggerUpdateFTS();

        this.createTableDescargaConfig();
        this.createTableCasillaConfig();
      })
      .catch((e) => {
        console.log('Error al crear la base de datos ' + e);
      });
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  deleteConfigDatabase(){
    this.dropTablePersonas();
    this.dropTablePersonasFTS();
    this.dropTableTriggerInsertFTS();
    this.dropTableTriggerDeleteFTS();
    this.dropTableTriggerUpdateFTS()
  }

  dropTablePersonas(){
    let sql = `DROP TABLE IF EXISTS personas`;
    return this.database.executeSql(sql, []);  
  }

  dropTablePersonasFTS(){
    let sql = `DROP TABLE IF EXISTS personas_tfs`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerInsertFTS(){
    let sql = `DROP TRIGGER IF EXISTS persona_ai`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerDeleteFTS(){
    let sql = `DROP TRIGGER IF EXISTS persona_ad`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerUpdateFTS(){
    let sql = `DROP TRIGGER IF EXISTS persona_au`;
    return this.database.executeSql(sql, []);  
  }

  createTablePersonas(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS personas(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              persona_id INTERGER,
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
              voto INTEGER DEFAULT 0,
              fecha_voto TEXT,
              hora_voto TEXT,
              fecha_creacion timestamp DATE DEFAULT (datetime('now','localtime')))`;
    return this.database.executeSql(sql, []);

  }

  createTablePersonasFTS(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE VIRTUAL TABLE IF NOT EXISTS personas_tfs USING fts4(
              persona_id,
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
              fecha_voto TEXT,
              hora_voto TEXT,
              fecha_creacion,
              NOTINDEXED=persona_id,
              NOTINDEXED=direccion,
              NOTINDEXED=fecha_nacimiento,
              NOTINDEXED=edad,
              NOTINDEXED=seccion,
              NOTINDEXED=municipio,
              NOTINDEXED=localidad,
              NOTINDEXED=comisaria,
              NOTINDEXED=voto,
              NOTINDEXED=fecha_voto,
              NOTINDEXED=hora_voto,
              NOTINDEXED=fecha_creacion,
              content=personas)`;
    return this.database.executeSql(sql, []);

  }

  createTriggerInsertFTS(){
    let sql = `CREATE TRIGGER IF NOT EXISTS persona_ai AFTER INSERT ON personas
               BEGIN
                   INSERT INTO personas_tfs (rowid, nombre, apellido_paterno, apellido_materno, nombre_completo)
                   VALUES (new.id, new.nombre, new.apellido_paterno, new.apellido_materno, new.nombre_completo);
               END;`
    return this.database.executeSql(sql, []);
  }

  createTriggerDeleteFTS(){
    let sql = `CREATE TRIGGER IF NOT EXISTS persona_ad AFTER DELETE ON personas
               BEGIN
                   INSERT INTO personas_tfs (personas_tfs, rowid, nombre, apellido_paterno, apellido_materno, nombre_completo)
                   VALUES ('delete', old.id, old.nombre, old.apellido_paterno, old.apellido_materno, old.nombre_completo);
               END;`
    return this.database.executeSql(sql, []);
  }

  createTriggerUpdateFTS(){
    let sql = `CREATE TRIGGER IF NOT EXISTS persona_au AFTER UPDATE ON personas
               BEGIN
                   INSERT INTO personas_tfs (personas_tfs, rowid, nombre, apellido_paterno, apellido_materno, nombre_completo)
                   VALUES ('delete', old.id, old.nombre, old.apellido_paterno, old.apellido_materno, old.nombre_completo);
                   INSERT INTO personas_tfs (rowid, nombre, apellido_paterno, apellido_materno, nombre_completo)
                   VALUES (new.id, new.nombre, new.apellido_paterno, new.apellido_materno, new.nombre_completo);
               END;`
    return this.database.executeSql(sql, []);
  }

  createTableDescargaConfig(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS descarga(
              id INTEGER PRIMARY KEY CHECK (id = 0),
              preview TEXT,
              next TEXT,
              status INTEGER NOT NULL DEFAULT 0,
              fecha_creacion timestamp DATE DEFAULT (datetime('now','localtime')))`;
    return this.database.executeSql(sql, []);

  }

  createTableCasillaConfig(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS descarga(
              id INTEGER PRIMARY KEY CHECK (id = 0),
              status TEXT DEFAULT 'CERRADA',
              finalizado INTEGER NOT NULL DEFAULT 0,
              fecha_apertura timestamp DATE DEFAULT (datetime('now','localtime')),
              fecha_cierre timestamp default current_timestamp)`;
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

  addPerson(id, nombre, apellido_paterno, apellido_materno, nombre_completo, direccion, fecha_nacimiento, edad,seccion, municipio, localidad, comisaria){
    
    this.personaSeccion = [];
    // this.personaSeccion.push(persona)
    // let data = [persona.id, persona.nombre, persona.apellido_paterno, persona.apellido_materno, persona.nombre_completo, persona.direccion, persona.fecha_nacimiento, persona.edad,persona.seccion, persona.municipio, persona.localidad, persona.comisaria ];
    let data = [id, nombre, apellido_paterno, apellido_materno, nombre_completo, direccion, fecha_nacimiento, edad,seccion, municipio, localidad, comisaria];
    let sql = `INSERT INTO personas(
              persona_id, 
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
    return this.database.executeSql(sql, data);
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
    return this.database.executeSql(sql, []);
          //  .then(resp => {
          //    debugger
          //     let personas = [];
          //     if(resp.rows.length > 0) {
          //       for(let i = 0; i < resp.rows.length; i++){
          //         personas.push(resp.rows.item(i));
          //         console.log('obtenido desde la base de datos '+resp.rows.item(i))
          //       }
          //       // return Promise.resolve(personas);
          //       return personas;
          //     }
          //  })
          //  .catch(error=> {
          //   //  Promise.reject(error);
          //   console.log(error);
            
          //  });
    }

    getFtsPeople(strNombres: String){
      let sql = `SELECT * FROM personas_tfs WHERE personas_tfs MATCH '${strNombres}'`
      return this.database.executeSql(sql,[])
    }
    
}