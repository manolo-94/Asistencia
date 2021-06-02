import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { UiServicesService } from '../../services/ui-services.service';
import { DatabaseService } from '../../services/database.service';
import { PersonaLN } from '../../interfaces/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { data } from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from '../../services/network.service';


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

  public token:string = null;

  constructor( private modalCtrl:ModalController,
               private uiService:UiServicesService,
               private database: DatabaseService,
               public fb: FormBuilder,
               public networkService: NetworkService) { 

                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                  apellido_paterno: ['',Validators.required],
                  apellido_materno: ['',Validators.required]
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
      confirmButtonText: 'Si',
      
    }).then((result) => {
      if (result.isConfirmed) {

        let nombre = this.form.get('nombre').value;
        let apellido_paterno = this.form.get('apellido_paterno').value;
        let apellido_materno = this.form.get('apellido_materno').value;

        console.log(nombre)

        if (nombre == ''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo nombre es requrido'
          })

          return
        }
        if (apellido_paterno == ''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo apellido paterno es requrido, si no tiene puedes poner dos xx'
          })

          return
        }
        if (apellido_materno == ''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo apellido materno es requrido, si no tiene puedes poner dos xx'
          })

          return
        }

          let formData = {}
          let json = {};
          
          let data = new FormData();
          data.append("nombre", nombre)
          data.append("apellido_paterno", apellido_paterno)
          data.append("apellido_materno", apellido_materno)
          console.log(data);

          data.forEach((value,key) => {
            // console.log(key+" "+value);
            formData[key] = value;
          })

           json = JSON.stringify(formData);
          
          console.log(json);

          this.database.getTokenUser()
              .then( then => {
                // console.log(then)
                if(then.rows.length > 0){
                  for (let i = 0; i < then.rows.length; i++){
                    // console.log(then.rows.item(i)['token']);
                  
                    this.token = then.rows.item(i)['token'];
                  }
                
                  this.database.addPromovidoNoLN(this.token,json)
                      .subscribe(resp => {
                        console.log(resp);
                        Swal.fire(
                          'Información guardada correctamente.',
                          '',
                          'success'
                        )
                        
                        
                      }, err => {
                        console.log(err);
                        // console.log('No se pudo agregar');
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'No se pudo agregar correctamente.'
                        })
                      })
                }
              })
              .catch(err => {
                console.log('no realizar la consulta');
              })
              
            
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


