import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { UiServicesService } from '../../services/ui-services.service';
import { DatabaseService } from '../../services/database.service';
import { PersonaLN } from '../../interfaces/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { data } from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';


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

  newPerson = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
  }

  form: FormGroup;


  constructor( private modalCtrl:ModalController,
               private uiService:UiServicesService,
               private database: DatabaseService,
               public fb: FormBuilder) { 

                this.form = this.fb.group({
                  nombre: [''],
                  apellido_paterno: [''],
                  apellido_materno: ['']
                })
               
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
      const form = document.querySelector('form');
      if (result.isConfirmed) {

          // let data = new FormData();
          // data.append("nombre", this.form.get('nombre').value)
          // data.append("apellido_paterno", this.form.get('apellido_paterno').value)
          // console.log(data);

          // data.forEach((value,key) => {
          //   console.log(key+" "+value);
          // })
        
        
        Swal.fire(
          'Información guardada',
          '',
          'success'
        )
        this.modalCtrl.dismiss();
      }
    }
  )}

  formGuardar(){
    let data = new FormData();
          data.append("nombre", this.form.get('nombre').value)
          data.append("apellido_paterno", this.form.get('apellido_paterno').value)
          console.log(data);
          // new Response(data).text().then(console.log)

          // for (var key in data){
          //   console.log(key, data[key]);
          // }

          // for (var pair of data.entries()) {
          //   console.log(pair[0]+ ', ' + pair[1]); 
          //  } 

          // data.forEach((value,key) => {
          //   console.log(key+" "+value);
          // })
  }

  

}


