import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { UiServicesService } from '../../services/ui-services.service';

@Component({
  selector: 'app-detallepersona',
  templateUrl: './detallepersona.component.html',
  styleUrls: ['./detallepersona.component.scss'],
})
export class DetallepersonaComponent implements OnInit {

  @Input() persona;

  constructor( private modalCtrl:ModalController,
               private uiService:UiServicesService) { }

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

}
