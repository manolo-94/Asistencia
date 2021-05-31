import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { PersonaLN, PersonasObject, PersonaSeccion, Voto, Casilla } from '../interfaces/interfaces';
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

   voto: Voto[] = [];

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

        this.createTableUsuario();

        this.createTablePersonas();
        this.createTablePersonasFTS();
        this.createTriggerInsertFTS();
        this.createTriggerDeleteFTS();
        this.createTriggerUpdateFTS();
        this.createTriggerBeforeUpdateFTS();

        this.createTableDescargaConfig();
        this.createTriggerNoInsertDescarga();
        
        this.createTableCasillaConfig();
        this.createTriggerNoInsertCasilla()
        this.createTriggerUpdateCierreCasilla();

        this.createTableVotacion();
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
    this.dropTableUsuario();
    this.dropTablePersonasFTS();
    this.dropTableTriggerInsertFTS();
    this.dropTableTriggerDeleteFTS();
    this.dropTableTriggerUpdateFTS()
    this.dropTableTriggerBeforeUpdateFTS()
    this.dropTableVotacion();

    this.dropTableDescargaConfig();
    this.dropTableTriggerNoInsertDescarga();

    this.dropTableCasillaConfig();
    this.dropTableTriggerNoInsertCasilla();
    this.dropTableTriggerUpdateCierreCasilla();
    
  }

  deleteInfoDescarga(){
    this.dropTablePersonas();
    this.dropTablePersonasFTS();
    this.dropTableTriggerInsertFTS();
    this.dropTableTriggerDeleteFTS();
    this.dropTableTriggerUpdateFTS()
    this.dropTableTriggerBeforeUpdateFTS()

    this.dropTableVotacion();
    
    this.dropTableCasillaConfig();
    this.dropTableTriggerNoInsertCasilla();
    this.dropTableTriggerUpdateCierreCasilla();
  }

  createInfoDescarga(){
    this.createTablePersonas();
    this.createTablePersonasFTS();
    this.createTriggerInsertFTS();
    this.createTriggerDeleteFTS();
    this.createTriggerUpdateFTS();
    this.createTriggerBeforeUpdateFTS();

    this.createTableVotacion();

    this.createTableCasillaConfig();
    this.createTriggerNoInsertCasilla();
    this.createTriggerUpdateCierreCasilla();

  }

  dropTablePersonas(){
    let sql = `DROP TABLE IF EXISTS personas`;
    return this.database.executeSql(sql, []);  
  }

  dropTableUsuario(){
    let sql = `DROP TABLE IF EXISTS usuario`;
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

  dropTableTriggerBeforeUpdateFTS(){
    let sql = `DROP TRIGGER IF EXISTS persona_bu`;
    return this.database.executeSql(sql, []);  
  }

  dropTableVotacion(){
    let sql = `DROP TABLE IF EXISTS votacion`;
    return this.database.executeSql(sql, []);  
  }

  dropTableDescargaConfig(){
    let sql = `DROP TABLE IF EXISTS descarga`;
    return this.database.executeSql(sql, []);  
  }

  dropTableCasillaConfig(){
    let sql = `DROP TABLE IF EXISTS casilla`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerNoInsertDescarga(){
    let sql = `DROP TRIGGER IF EXISTS config_no_insert_descarga`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerNoInsertCasilla(){
    let sql = `DROP TRIGGER IF EXISTS config_no_insert_casilla`;
    return this.database.executeSql(sql, []);  
  }

  dropTableTriggerUpdateCierreCasilla(){
    let sql = `DROP TRIGGER IF EXISTS config_update_last_time_casilla`;
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
              id,
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
              NOTINDEXED=id,
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
                   INSERT INTO personas_tfs (docid, nombre, apellido_paterno, apellido_materno, nombre_completo)
                   VALUES (new.rowid, new.nombre, new.apellido_paterno, new.apellido_materno, new.nombre_completo);
               END;`
    return this.database.executeSql(sql, []);
  }


  createTriggerDeleteFTS(){
    let sql = `CREATE TRIGGER IF NOT EXISTS persona_ad BEFORE DELETE ON personas
               BEGIN
                   DELETE FROM personas_tfs WHERE docid = old.rowid;
               END`
    return this.database.executeSql(sql, []);
  }

  createTriggerUpdateFTS(){
      let sql = `CREATE TRIGGER IF NOT EXISTS persona_au AFTER UPDATE ON personas
                 BEGIN
                     INSERT INTO personas_tfs (docid, id, nombre, apellido_paterno, apellido_materno, nombre_completo)
                     VALUES (new.rowid, new.id, new.nombre, new.apellido_paterno, new.apellido_materno, new.nombre_completo);
                 END;`
      return this.database.executeSql(sql, []);
  }

  createTriggerBeforeUpdateFTS(){
      let sql = `CREATE TRIGGER IF NOT EXISTS persona_bu BEFORE UPDATE ON personas
                 BEGIN
                     DELETE FROM personas_tfs WHERE docid = old.rowid;
                 END;`
      return this.database.executeSql(sql, []);
  }

  // createTableDescargaConfig(){
  //   // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
  //   let sql = `CREATE TABLE IF NOT EXISTS descarga(
  //             id INTEGER PRIMARY KEY CHECK (id = 0),
  //             preview TEXT,
  //             next TEXT,
  //             status BOOLEAN,
  //             fecha_creacion timestamp DATE DEFAULT (datetime('now','localtime')))`;
  //   return this.database.executeSql(sql, []);

  // }

  createTriggerNoInsertDescarga(){
    let sql = `CREATE TRIGGER IF NOT EXISTS config_no_insert_descarga
              BEFORE INSERT ON descarga
              WHEN (SELECT COUNT(*) FROM descarga) >= 1
              BEGIN
                  SELECT RAISE(FAIL, 'only one row!');
              END;`
    return this.database.executeSql(sql,[]);
  }

  createTableDescargaConfig(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS descarga(
              id INTEGER PRIMARY KEY CHECK (id = 0),
              status BOOLEAN,
              fecha_creacion timestamp DATE DEFAULT (datetime('now','localtime')))`;
    return this.database.executeSql(sql, []);

  }

  createTableCasillaConfig(){
    // let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    let sql = `CREATE TABLE IF NOT EXISTS casilla(
              id INTEGER PRIMARY KEY CHECK (id = 0),
              status TEXT,
              finalizado BOOLEAN,
              mensaje TEXT,
              fecha_apertura timestamp DATE DEFAULT (datetime('now','localtime')),
              fecha_cierre timestamp DATE DEFAULT (datetime('now','localtime')))`;
    return this.database.executeSql(sql, []);

  }

  createTriggerNoInsertCasilla(){
    let sql = `CREATE TRIGGER IF NOT EXISTS config_no_insert_casilla
              BEFORE INSERT ON casilla
              WHEN (SELECT COUNT(*) FROM casilla) >= 1
              BEGIN
                  SELECT RAISE(FAIL, 'only one row!');
              END;`
    return this.database.executeSql(sql,[]);
  }
  
  createTriggerUpdateCierreCasilla(){
    let sql = `CREATE TRIGGER if NOT EXISTS config_update_last_time_casilla 	
                AFTER UPDATE on casilla 
                BEGIN 
                UPDATE casilla SET fecha_cierre = datetime('now','localtime') WHERE id = 0;
                end;`

    return this.database.executeSql(sql,[])
  }

  insertConfigCasilla(status:string, finalizado:boolean, mensaje:string){
    let sql = `INSERT INTO casilla(
              id,
              status,
              finalizado,
              mensaje
              ) VALUES (0,'${status}',${finalizado},'${mensaje}')`;

    return this.database.executeSql(sql,[])
  }

  getConfigCasilla(){
    let sql = `SELECT * FROM casilla`;

    return this.database.executeSql(sql,[])
  }

  updateConfigCasilla(status:string, finalizado:boolean, mensaje:string){
    let data = [status,finalizado,mensaje]
    let sql = `UPDATE casilla SET status = ?, finalizado = ?, mensaje = ? WHERE id = 0`;

    return this.database.executeSql(sql, data)
  }

  // createTableVotacion(){
  //   let sql = `CREATE TABLE IF NOT EXISTS votacion(
  //             id INTEGER PRIMARY KEY AUTOINCREMENT,
  //             id_persona_fk INTERGER NOT NULL,
  //             status BOOLEAN,
  //             fecha_guardado timestamp DATE DEFAULT (datetime('now','localtime')),
  //             FOREIGN KEY (id_persona_fk) REFERENCES personas (id) ON DELETE CASCADE)`;

  //   return this.database.executeSql(sql,[]);
  // }

  createTableVotacion(){
    let sql = `CREATE TABLE IF NOT EXISTS votacion(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              id_persona INTERGER NOT NULL,
              nombre_completo VARCHAR(255),
              status BOOLEAN,
              fecha_guardado timestamp DATE DEFAULT (datetime('now','localtime')))`;

    return this.database.executeSql(sql,[]);
  }

  createTableUsuario(){
    let sql = `CREATE TABLE IF NOT EXISTS usuario(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username VARCHAR UNIQUE,
              password VARCHAR,
              token VARCHAR,
              status BOOLEAN,
              fecha_guardado timestamp DATE DEFAULT (datetime('now','localtime'))
              )`;

    return this.database.executeSql(sql,[])
  }

  async downloadPersonas(newURL:string, token:string){
   
    // this.token = await this.storage.get('token') || null;
    
    this.token = token || null;
    
    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });
    if(newURL != null){
      return this.http.get<PersonasObject>(`${newURL}`,{headers});
    }else{
      return this.http.get<PersonasObject>(`${URL}/personas/persona/seccion/`,{headers});
    }

  }

  // async downloadPersonas(newURL:string){
    
  //   this.token = await this.storage.get('token') || null;
    
  //   const headers = new HttpHeaders({
  //     'Authorization' : 'Token ' + this.token
  //   });
  //   if(newURL != null){
  //     return this.http.get<PersonasObject>(`${newURL}`,{headers});
  //   }else{
  //     return this.http.get<PersonasObject>(`${URL}/personas/persona/seccion/`,{headers});
  //   }

  // }

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
  }

  deletePerson(id:number){

    let sql = `DELETE FROM personas WHERE id = ${id}`;

    return this.database.executeSql(sql,[]);

  }

  getPeople(){
    let sql = 'SELECT * FROM personas ORDER BY nombre_completo ASC'
    return this.database.executeSql(sql, []);
  }

  getFtsPeople(strNombres: String){
      let sql = `SELECT * FROM personas_tfs WHERE personas_tfs MATCH '${strNombres}*'`
      return this.database.executeSql(sql,[])
  }

  async addPersonaVoto(persona_id:number, token:string){
    
    // this.token = await this.storage.get('token') || null;
    this.token = token|| null;

    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });

    return this.http.get<Voto>(`${URL}/personas/persona/voto/`+persona_id,{headers});
            //  .subscribe(resp => {
            //    console.log(resp);
            //  },(err)=>{
            //   console.log(err['error']['error'])
            //  });
  }

  // addVotacion(id_persona_fk:number,status:number){
  //   let data = [id_persona_fk,status]
  //   let sql = `INSERT INTO votacion(
  //             id_persona_fk,
  //             status
  //             ) VALUES (?,?)`;
  //   return this.database.executeSql(sql, data);
  // }

  addVotacion(id_persona:number,nombre_completo:string,status:number){
    let data = [id_persona, nombre_completo, status]
    let sql = `INSERT INTO votacion(
              id_persona,
              nombre_completo,
              status
              ) VALUES (?,?,?)`;
    return this.database.executeSql(sql, data);
  }

  // getVotacion(){
  //     let sql = `SELECT persona_id, nombre_completo, status
  //               FROM personas as a INNER JOIN votacion as b
  //               ON a.id = b.id_persona_fk
  //               ORDER BY nombre_completo`;
  //     return this.database.executeSql(sql, []);
  // }

  getVotacion(){
    let sql = `SELECT * FROM votacion ORDER BY fecha_guardado DESC`;
    return this.database.executeSql(sql, []);
  }

  validateUser(username:string, password:string){
    let sql = `SELECT * FROM usuario WHERE username = '${username}' AND password = '${password}'`;
    // let sql = `SELECT * FROM usuario`;
    
     return this.database.executeSql(sql, [])
  }

  saveUser(username:string, password:string, token:string, status:boolean){
    let data = [username,password,token,status];
    let sql = `INSERT INTO usuario(
              username,
              password,
              token,
              status
              ) VALUES (?,?,?,?)`;

    return this.database.executeSql(sql,data);
  }

  validateStatusUser(username:string, password:string){
    let sql = `SELECT token, status FROM usuario WHERE username = '${username}' AND password = '${password}' `;

    return this.database.executeSql(sql,[])
  }

  recordStatusDownload(status:boolean){
    let data = [0,status]
    let sql = `INSERT INTO descarga(
              id,
              status
              ) VALUES (0,${status})`;

    return this.database.executeSql(sql,[])
  }

  getStatusDownload(){
    let sql = `SELECT * FROM descarga`;

    return this.database.executeSql(sql,[]);
  }

  getTokenUser(){
    let sql = `SELECT token FROM usuario`;

    return this.database.executeSql(sql,[])
  }

  abrirCasilla(token:string){

    this.token = token|| null;

    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });

    return  this.http.get<Casilla>(`${URL}/cartografia/casilla/abrir/0`,{headers});
            
  }

  cerrarCasilla(token:string){
    
    this.token = token|| null;

    const headers = new HttpHeaders({
      'Authorization' : 'Token ' + this.token
    });

    return this.http.get<Casilla>(`${URL}/cartografia/casilla/cerrar/0`,{headers});
            
  }
    
}