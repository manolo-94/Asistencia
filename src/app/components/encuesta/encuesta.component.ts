import { Component, Input, OnInit } from '@angular/core';
import { Encuesta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  @Input() encuesta: Encuesta[] = [];

  constructor() { }

  ngOnInit() {}

}
