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

        this.database.getConfigCasilla()
        .then(result =>{
          let status:string;
          if(result.rows.length > 0){
            for (let i = 0; i < result.rows.length; i++){
              status = result.rows.item(i)['status']
            }
            if(status == 'CERRADA'){
              // console.log('la casilla ya fue cerrada definitivamente')
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tu casilla esta cerrada debe de estar abierta para comenzar a marcar la asistencia de las personas que fueron a votar'
              })
            }
            if(status == 'ABIERTA'){
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
                
                // console.log(json);
      
                this.networkService.getNetworkTestRequest()
                  .subscribe(success =>{ 
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
                                  
                                  
                                  this.database.savePersonaNoLN(true,json)
                                      .then(then =>{
                                        Swal.fire(
                                          'Información enviada y guardada correctamen.',
                                          '',
                                          'success'
                                        )
                                        
                                        // this.database.getAllPersonaNoLNB()
                                        //     .then(then =>{
                                        //       if(then.rows.length > 0){
      
                                        //         // for (let i = 0; i < then.rows.length; i++){
                                        //         //   console.log(then.rows.item(i));
                                        //         // }
                                        //         console.log('si hay registros');
                                                
                                        //       }else{
                                        //         console.log('No se obtuvo registros');
                                        //       }
                                        //     })
      
                                      })
                                      .catch(err =>{
                                        Swal.fire(
                                          'Información enviada correctamente.',
                                          '',
                                          'success'
                                        )
                                        
                                      })
                                  
                                }, err => {
                                  console.log(err);
                                  // console.log('No se pudo agregar');
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'No se pudo enviar la información por el momento, no te preocupes la intentaremos enviar mas tarde.'
                                  })
      
                                  this.database.savePersonaNoLN(true,json)
                                      .then(then =>{
                                        console.log('Información enviada y guardada correctamen');
                                        
                                        this.database.getAllPersonaNoLNB()
                                            .then(then =>{
                                              if(then.rows.length > 0){
      
                                                // for (let i = 0; i < then.rows.length; i++){
                                                //   console.log(then.rows.item(i));
                                                // }
                                                console.log('si hay registros');
                                              }else{
                                                console.log('No se obtuvo registros');
                                              }
                                            })
      
                                      })
                                      .catch(err =>{
                                        console.log(('No se pudo ejecutar la consulta correctamente'));
                                        
                                      })
      
                                })
      
                          }
                        })
                        .catch(err => {
                          console.log('no se realizo la consulta');
      
                        })
                  }, err =>{
                    Swal.fire(
                      'Información guardada correctamente.',
                      '',
                      'success'
                    )
                    this.database.savePersonaNoLN(false,json)
                        .then(then =>{
                          console.log('Información guardada correctamen');
                          
                          this.database.getAllPersonaNoLNB()
                              .then(then =>{
                                if(then.rows.length > 0){
                                  // for (let i = 0; i < then.rows.length; i++){
                                  //   console.log(then.rows.item(i));
                                  // }
                                  console.log('si hay registros');
                                }else{
                                  console.log('No se obtuvo registros');
                                }
                              })
                        })
                        .catch(err =>{
                          console.log(('No se pudo ejecutar la consulta correctamente'));
                          
                        })
                  })
                    
                  
              this.modalCtrl.dismiss();
            }
          }
        })
        .catch(err =>{
          console.log('no se pudo obtener la consulta');
          
        })

        
      }
    }
  )
}

  formGuardar(){
    let data = new FormData();
          data.append("nombre", this.form.get('nombre').value)
          data.append("apellido_paterno", this.form.get('apellido_paterno').value)
          console.log(data);
  }

  

}


