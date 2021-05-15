import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.page.html',
  styleUrls: ['./descarga.page.scss'],
})
export class DescargaPage implements OnInit {

  public paginasTotales: number = 0;
  public paginaActual: number = 0
  public porcentValue: number = 0;

  constructor( private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  async downloadPersonas(){
    await this.databaseService.downloadPersonas()
          .then(then => {
            then.subscribe(resp => {
              console.log(resp.next);
              console.log(resp.results);
            })
          })
  }



}
