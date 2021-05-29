import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { personaVoto } from '../../interfaces/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-votantes',
  templateUrl: './votantes.page.html',
  styleUrls: ['./votantes.page.scss'],
})
export class VotantesPage implements OnInit {

  personasVoto:personaVoto [] = [];

  constructor( private databaseService: DatabaseService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.databaseService.getVotacion()
        .then(resp => {
          this.personasVoto = [];
            for(let i = 0; i < resp.rows.length; i++){
              console.log(resp.rows.item(i));
              this.personasVoto.push(resp.rows.item(i));
            }
          })
  }

  enviarVotos(){
    Swal.fire({
      title: 'Enviar',
      text: "¿Deseas enviar la información al servidor de redundancia?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Enviado!',
          'Tu información se envió correctamente.',
          'success'
        )
      }
    })
  }

}
