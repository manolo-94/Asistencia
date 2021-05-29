import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { IonSlides, NavController } from '@ionic/angular';
import { UiServicesService } from 'src/app/services/ui-services.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usario } from '../../interfaces/interfaces';
import { NetworkService } from '../../services/network.service';
import { DatabaseService } from '../../services/database.service';

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
    username: '',
    password: ''
  }

  registerUser: Usario = {
    username: 'luis.villanueva',
    // username: 'test.test',
    // username: 'noExisto.nopassword',
    email: 'test.test@gmail.com',
    password: '_Temporal1',
  };

  constructor(  private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private uiService: UiServicesService,
                public network: Network,
                public networkService: NetworkService,
                public databaseService: DatabaseService) { 

                  // this.ionViewDidLoad();

                }

  ngOnInit() {
    /* this.slides.lockSwipes(true); */
    //bloquear la pantalla para que no se deslice
    this.slider.lockSwipes(true);
  }

  async login( fLogin: NgForm ){


    if (fLogin.invalid){return;}

    await this.databaseService.validateUser(this.loginUser.username,this.loginUser.password)
        .then(then =>{

          let status: boolean = false;
          // console.log(then)
          // console.log(then.rows.length)
          // for (let i = 0; i < then.rows.length; i++){
          //   console.log(then.rows.item(i))
          // }
          if(then.rows.length > 0){
            // console.log('el usuario si existe')
            for (let i = 0; i < then.rows.length; i++){
              // console.log(then.rows.item(i));
              status = then.rows.item(i)['status'];
            }

            if (!status){
              this.networkService.getNetworkTestRequest()
                .subscribe( success => {
                  // si tenemos acceso a internet o al servidor tratamos de obtener nuestro token
                  this.usuarioService.getToken(this.loginUser.username, this.loginUser.password)
                      .subscribe(resp =>{
                        // si nuestro usuario y contraseña son validos obtendremos nuestro token y guardaremos la informacion en el telefono
                        // e iniciaremos la app
                        // console.log(resp['auth_token'])
                        this.databaseService.saveUser(this.loginUser.username,this.loginUser.password,resp['auth_token'],true)
                            .then( then => {
                              // console.log('usuario guardado correctamente');
                              this.uiService.alertaInformativa('Usuario guardado correctamente')
                            })
                        this.navCtrl.navigateRoot('/tablinks/personas', {animated: true});
                      },error => {
                        // si el usaurio y contraseña son incorrecto o no existen nos mostrara un error y no nos dejara iniciar la app
                        // console.log(error['error']['non_field_errors']);
                        this.uiService.alertaInformativa(error['error']['non_field_errors'])
                      })

                },error => {
                  // si no tenemos acceso a internet o al servidor no mostrara un mensaje que validemos nuestra conexion a internet
                  this.uiService.alertaInformativa('Verifique su conexión de internet')
                })
            }else{
              this.navCtrl.navigateRoot('/tablinks/personas', {animated: true});
            }
          }else{
            // console.log('el usuario no existe');
            // EL usuario no existe validamos si tenemos conexion ha internet o con el servidor
            this.networkService.getNetworkTestRequest()
                .subscribe( success => {
                  // si tenemos acceso a internet o al servidor tratamos de obtener nuestro token
                  this.usuarioService.getToken(this.loginUser.username, this.loginUser.password)
                      .subscribe(resp =>{
                        //Eliminamos todos la info del usuario logueado anteriormente
                        this.databaseService.deleteInfoDescarga();
                        this.databaseService.createInfoDescarga();

                        this.databaseService.dropTableUsuario();
                        this.databaseService.createTableUsuario();

                        this.databaseService.dropTableDescargaConfig();
                        this.databaseService.createTableDescargaConfig();

                        this.databaseService.dropTableTriggerNoInsertDescarga();
                        this.databaseService.createTriggerNoInsertDescarga();

                        this.databaseService.dropTableVotacion();
                        this.databaseService.createTableVotacion();
                        // si nuestro usuario y contraseña son validos obtendremos nuestro token y guardaremos la informacion en el telefono
                        // e iniciaremos la app
                        // console.log(resp['auth_token'])
                        this.databaseService.saveUser(this.loginUser.username,this.loginUser.password,resp['auth_token'],true)
                            .then( then => {
                              // console.log('usuario guardado correctamente');
                              this.uiService.alertaInformativa('Usuario guardado correctamente')
                            })
                        this.navCtrl.navigateRoot('/tablinks/personas', {animated: true});
                      },error => {
                        // si el usaurio y contraseña son incorrecto o no existen nos mostrara un error y no nos dejara iniciar la app
                        // console.log(error['error']['non_field_errors']);
                        this.uiService.alertaInformativa(error['error']['non_field_errors'])
                      })

                },error => {
                  // si no tenemos acceso a internet o al servidor no mostrara un mensaje que validemos nuestra conexion a internet
                  this.uiService.alertaInformativa('Verifique su conexión de internet')
                })
          
          }
        },(error) =>{
          console.log('No se puedo realizar la consulta');
          this.uiService.alertaInformativa('No se pudo realizar la verificación del usuario en la base de datos')
          
        })
    
    // const valido = await this.usuarioService.login(this.registerUser.username, this.registerUser.password);

    // if (valido[0] === true){

    //   this.navCtrl.navigateRoot('/tablinks/personas', {animated: true})
    // } else {

    //   this.networkService.getNetworkTestRequest()
    //     .subscribe(success =>{ 
    //       console.log('success testNetworkConnection') 
    //       this.uiService.alertaInformativa(valido[1])
    //     },error =>{
    //       console.log('error testNetworkConnection');
    //       this.uiService.alertaInformativa('Verifique su conexion de internet')
    //     })
    // }

  }

  async registro( fRegistro: NgForm ){

    if (fRegistro.invalid){ return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido[0] === true){
      console.log(this.registerUser);
      this.uiService.alertaInformativa('Usuario creado')
    } else {
      console.log(this.registerUser);
      this.uiService.alertaInformativa(valido[1])
    }

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
