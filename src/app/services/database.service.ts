import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject = null;

  constructor( private platform:Platform,
               private sqlite:SQLite,) {}

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
    let sql = 'CREATE TABLE IF NOT EXISTS personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo VARCHAR(255))';
    return this.database.executeSql(
      // `CREATE TABLE IF NOT EXISTS ${this.tables.personas} (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   id_persona INTERGER,
      //   nombre VARCHAR(255), 
      //   apellido_paterno VARCHAR(255),
      //   apellido_materno VARCHAR(255),
      //   nombre_completo VARCHAR(255),
      //   direccion VARCHAR(255),
      //   fecha_nacimiento VARCHAR(255),
      //   edad INTERGER,
      //   seccion INTERGER,
      //   municipio INTERGER,
      //   localidad INTERGER,
      //   comisaria VARCHAR(255),
      //   voto INTEGER NOT NULL DEFAULT 0,
      //   fecha_voto TEXT,
      //   hora_voto TEXT,
      //   fecha_creacion TEXT,
      //   hora_creacion TEXT)`,
      //   []

      // `CREATE TABLE IF NOT EXISTS ${this.tables.personas} (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   nombre_completo VARCHAR(255),`,
      //   []
      sql, []
    );

  }

  createPerson(nombre_completo:any){
    // let data = nombre_completo;
    let sql = 'INSERT INTO personas(nombre_completo) VALUES (?)';
    return this.database.executeSql(sql,[nombre_completo]);
    // return this.database.executeSql('INSERT INTO '+this.tables.personas+' (nombre_completo) VALUES (?)', data);
    // .then(resp => {
    //   console.log(resp);
    // })
    // .catch(error => {
    //   Promise.reject(error);
    // });
  }
  // async createPerson(nombre_completo:string){
  //   return this.database
  //     .executeSql(
  //       `INSERTE INTO ${this.tables.personas} (nombre_completo) VALUES ('${nombre_completo}')`
  //     )
  // }

  getPeople(){
    let sql = 'SELECT * FROM personas ORDER BY nombre_completo ASC'
    return this.database
    .executeSql(sql, [])
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
      // .executeSql(
      //   `SELECT * FROM ${this.tables.personas} ORDER BY nombre_completo ASC`,
      //   []
      // )
      // .then((resp) => {
      //   return resp
      // })
      // .catch((e) => {
      //   return "Error al obtener personas " + JSON.stringify(e);
      // });
  }
    
}