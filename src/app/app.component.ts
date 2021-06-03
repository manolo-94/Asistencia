import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

import { Platform, ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private databaseService: DatabaseService,
               private platform : Platform,
               private toastController:ToastController,
               private androidPermissions: AndroidPermissions) {

                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
                  result => console.log('Has permission?',result.hasPermission),
                  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
                );
                
                this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

        this.initializeApp();
        this.databaseService.createDataBase();
   }

   initializeApp(){
     this.platform.ready().then(() =>{
       this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CALL_PHONE).then((result) => {
         if(!result.hasPermission){
           this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CALL_PHONE);
         }
       },(err)=>{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CALL_PHONE);
       })
     })
   }



}
