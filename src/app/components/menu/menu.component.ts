import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private navCtrl: NavController,
              private usuarioService: UsuarioService) { }

  ngOnInit() {}

  incidencias(){
    this.navCtrl.navigateRoot('/tablinks/incidencias', {animated: true})
  }

  resultados(){
    // this.navCtrl.navigateRoot('/pages/resultados', {animated: true})
    this.navCtrl.navigateRoot('/tablinks/resultados', {animated: true})
  }

  logout(){
    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Seguro que deseas salir de la aplicación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesión finalizada',
          '',
          'success'
        )
        this.usuarioService.logout();
      }
    })
    // this.usuarioService.logout();
  }

}
