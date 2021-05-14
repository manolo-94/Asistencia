import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController) { }

  ngOnInit() {
  }

  descargarBase(){
    console.log('ir a descargar base')
  }

  verEncuesta(){
    console.log('listar encuestas');
  }

  inicio(){
    this.navCtrl.navigateRoot('/tablinks/inicio', {animated: true})
  }

  logout(){
    this.usuarioService.logout();
  }

  buscarPersona(){
    console.log('Buscar persona');
  }

}
