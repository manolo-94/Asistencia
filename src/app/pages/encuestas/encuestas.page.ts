import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';
import { Encuesta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  encuestas: Encuesta[] = [];

  constructor( private encuestasService: EncuestasService ) { }

  ngOnInit() {

   this.encuestasService.getEncuestas()
       .then( something => {
        something.subscribe(resp => {

          for(let i in resp){
            this.encuestas.push(resp[i])
          }
          
           console.log(resp);
         })
       })
    

  }

}
