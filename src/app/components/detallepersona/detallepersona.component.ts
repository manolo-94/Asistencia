import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { UiServicesService } from '../../services/ui-services.service';
import { DatabaseService } from '../../services/database.service';
import { PersonaLN } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detallepersona',
  templateUrl: './detallepersona.component.html',
  styleUrls: ['./detallepersona.component.scss'],
})
export class DetallepersonaComponent implements OnInit {

  @Input() persona;
  nombreCompleto: string = "";
  personaLN: PersonaLN[] = [];

  people: any = [];

  constructor( private modalCtrl:ModalController,
               private uiService:UiServicesService,
               private database: DatabaseService,) { 
                this.database.createDataBase();
               }

  ngOnInit() {
    console.log(this.persona)
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  promover(){
    this.uiService.alertaInformativa("Promovido");
    this.modalCtrl.dismiss();
  }

  // addVotante(){
  //   this.database.addPerson(this.persona.nombre_completo)
  //   .then(resp => {
  //     console.log(resp);
  //     this.uiService.alertaInformativa('agregado');
  //     this.modalCtrl.dismiss();
  //     this.getPersonas();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  getPersonas(){
    this.database.getPeople()
    .then(data => {
      console.log(data);
      this.people = [];
      this.people =  data
    })
    .catch(error => {
      console.log(error);
    })
    // this.database.getPeople().then((data) => {
    //   this.personaLN = [];
    //   if (data.rows?.length > 0){
    //     for (var i = 0; i < data.rows.length; i++){
    //       this.personaLN.push(data.rows.item(i));
    //     }
    //   }
    // });
  }

}
