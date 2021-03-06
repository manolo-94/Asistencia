import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var jQuery: any;

@Component({
  selector: 'app-detailencuesta',
  templateUrl: './detailencuesta.component.html',
  styleUrls: ['./detailencuesta.component.scss'],
})
export class DetailencuestaComponent implements OnInit {

  @Input() encuesta;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    const fbRender = document.getElementById("fb-render");

    const originalFormData = JSON.parse(this.encuesta);

    jQuery(function($:any) {
      const formData = JSON.stringify(originalFormData);
    
      $(fbRender).formRender({ formData });
      
    });

    console.log(this.encuesta);
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
