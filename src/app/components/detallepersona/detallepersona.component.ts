import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { UiServicesService } from '../../services/ui-services.service';
import { DatabaseService } from '../../services/database.service';
import { PersonaLN } from '../../interfaces/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js'

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

  guardar(){
    Swal.fire({
      title: '¿Deseas guardar la información ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Información guardada',
          '',
          'success'
        )
        this.modalCtrl.dismiss();
      }
    }
  )}

}
