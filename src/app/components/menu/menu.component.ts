import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  incidencias(){
    this.navCtrl.navigateRoot('/tablinks/incidencias', {animated: true})
  }

  resultados(){
    // this.navCtrl.navigateRoot('/pages/resultados', {animated: true})
    this.navCtrl.navigateRoot('/tablinks/resultados', {animated: true})
  }

}
