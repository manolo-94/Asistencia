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
    
    this.status = true;
    console.log(this.status)
    Swal.fire({
      title: 'Casilla!!',
      text:   "La casilla se ha abierto.",
      icon: 'success'
    }); 
  }

  closemodal()
  {
    this.status = false;
    console.log(this.status)
    Swal.fire({
      title: 'Casilla!!',
      text:   "La casilla se ha cerrado.",
      icon: 'error'
    });  
  }

}
