import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { personaVoto } from '../../interfaces/interfaces';

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

}
