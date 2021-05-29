import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.page.html',
  styleUrls: ['./casilla.page.scss'],
})
export class CasillaPage implements OnInit {

  status:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openmodal()
  {   
    console.log(this.status)
    Swal.fire({
      title: '¿Quieres abrir la casilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `SI`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.status = true;
        Swal.fire('Casilla abierta!', '', 'success')
      }
    })
  }

  closemodal()
  {
  //   this.status = false;
  //   console.log(this.status)
  //   Swal.fire({
  //     icon: 'error',
  //     input: 'textarea',
  //     inputLabel: 'Cerrar casilla',
  //     inputPlaceholder: '¿Porque quieres cerrar la casillas?',
  //     inputAttributes: {
  //       'aria-label': 'Type your message here'
  //     },
  // showCancelButton: true
  //   });  

    console.log(this.status)
    Swal.fire({
      title: '¿Quieres cerrar la casilla?',
      text: "Una vez cerrada la casilla no podrás abrirla nuevamente, en caso de necesitarlo contacta a tu representante inmediatamente.",
      icon: 'question',
      input: 'textarea',
      inputPlaceholder: '¿Porque quieres cerrar la casillas?',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonText: `Si`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.status = false;
        Swal.fire('Casilla cerrada!', '', 'success')
      }
    })

  }

}
