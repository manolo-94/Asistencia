import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Encuesta } from '../../interfaces/interfaces';
import { DetailencuestaComponent } from '../detailencuesta/detailencuesta.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  @Input() encuestaNombre: Encuesta[] = [];
  @Input() encuestaBody: Encuesta[] = [];

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalleEncuesta(encuesta: string){
    const modal = await this.modalCtrl.create({
      component: DetailencuestaComponent,
      componentProps:{
        encuesta
      }
    });

    modal.present();

  }

}
