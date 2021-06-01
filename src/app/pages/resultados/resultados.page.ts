import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DatabaseService } from '../../services/database.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  private token:string = null;

  resultados:string[] = [];

  fromResultados = {
    pm_pan : '', 
    pm_pri : '', 
    pm_prd : '', 
    pm_verde : '', 
    pm_pt : '', 
    pm_mc : '', 
    pm_morena : '',
    pm_na : '', 
    pm_pes : '', 
    pm_rsp : '', 
    pm_fpm : '', 
    pm_cia : '', 
    pm_cib : '', 
    pm_nulos : '', 

    df_pan : '', 
    df_pri : '', 
    df_prd : '', 
    df_verde : '', 
    df_pt : '', 
    df_mc : '', 
    df_morena : '',
    df_pes : '', 
    df_rsp : '', 
    df_fpm : '', 
    df_cia : '', 
    df_cib : '', 
    df_nulos : '', 

    dl_pan : '', 
    dl_pri : '', 
    dl_prd : '', 
    dl_verde : '', 
    dl_pt : '', 
    dl_mc : '', 
    dl_morena : '',
    dl_na : '', 
    dl_pes : '', 
    dl_rsp : '', 
    dl_fpm : '', 
    dl_cia : '', 
    dl_cib : '', 
    dl_nulos : '', 
  }

  constructor(private databaseServices:DatabaseService,
              private networkServices: NetworkService) { }

  ngOnInit() {
  }

  enviarResultados(){
    Swal.fire({
      title: 'Resultados',
      text: "¿Deseas enviar los resultados finales?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.resultados = [];
        this.networkServices.getNetworkTestRequest()
            .subscribe( success => {

              this.databaseServices.getTokenUser()
                  .then(then => {
                    if(then.rows.length > 0){
                                  
                      for (let i = 0; i < then.rows.length; i++){
                        this.token = then.rows.item(i)['token'];
                      }

                      //41
                      let form_data = new FormData();

                      let dict:any = {}

                      dict = {
                        "pm_pan": this.fromResultados.pm_pan,
                        "pm_pri": this.fromResultados.pm_pri
                      }
                      console.log(dict)

                    }else{
                      console.log('No se encontro ningun resultado');
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    console.log('no ejecutar la consulta');
                  })

        }, error =>{
          console.log(error);
          
          console.log('sin internet');
          
        })
        

        // Swal.fire(
        //   'Enviado!',
        //   'Tu información se envió correctamente.',
        //   'success'
        // )
      }
    })
  }

}
