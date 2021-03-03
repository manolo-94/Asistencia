import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiServicesService } from 'src/app/services/ui-services.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('sliderPrincipal', {static: true}) slider: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  };

  loginUser = {
    username: 'eduardo.osorio',
    password: '_Temporal1'
  }

  constructor(  private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private uiService: UiServicesService) { }

  ngOnInit() {
    /* this.slides.lockSwipes(true); */
    this.slider.lockSwipes(true);
  }

  async login( fLogin: NgForm ){

    if (fLogin.invalid){return;}

    const valido = await this.usuarioService.login(this.loginUser.username, this.loginUser.password);

    if (valido){
      this.navCtrl.navigateRoot('/formrender', {animated: true})
    } else {
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos')
    }

    /* console.log(fLogin.valid);
    console.log(this.loginUser) */
  }

  registro( fRegistro: NgForm ){
    console.log(fRegistro.valid);
  }

  seleccionarAvatar( avatar){
    this.avatars.forEach(av => av.seleccionado = false );
    avatar.seleccionado = true;
  }

  mostrarRegistro(){
    this.slider.lockSwipes(false);
    this.slider.slideTo(0)
    this.slider.lockSwipes(true);
  }

  mostrarLogin(){
    this.slider.lockSwipes(false);
    this.slider.slideTo(1)
    this.slider.lockSwipes(true);
  }

}
