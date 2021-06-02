import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private databaseService: DatabaseService,
               private platform : Platform,
               private toastController:ToastController) {

        this.databaseService.createDataBase();
   }


}
