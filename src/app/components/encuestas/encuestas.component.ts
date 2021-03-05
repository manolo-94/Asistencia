import { Component, Input, OnInit } from '@angular/core';
import { Encuesta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-encuestas-list',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
})
export class EncuestasComponent implements OnInit {

  @Input() encuestas: Encuesta[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.encuestas);
  }

}
