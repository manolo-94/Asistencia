import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private databaseService: DatabaseService ) {
        this.databaseService.createDataBase();
   }

  // constructor( private sqlite: SQLite ) {
  //   this.sqlite.create({
  //     name: 'db_electoral.db',
  //     location: 'default'
  //   })
  //   .then((db: SQLiteObject) => {
  //     this.database = db;
  //     db.executeSql('create table if not exist personas(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_completo char(255))',[])
  //                   .then(() => console.log('Executed SQL'))
  //                   .catch( e => console.log(e));
  //   })
  //   .catch(e => console.log(e));
  //  }



}
