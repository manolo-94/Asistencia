import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DatabaseService } from '../../services/database.service';
import { PersonaLN } from '../../interfaces/interfaces';

interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
   {
     icon: 'reader-outline',
     name: 'Form Render',
     redirecTo: '/formrender'
   } 
  ]

  constructor() {

   }

  ngOnInit() {
  }


  @ViewChild('barChart') barChart;

  @ViewChild('barChart2') barChart2;

  bars: any;
  colorArray: any;

  bars2: any;
  colorArray2: any;

  ionViewDidEnter() {
    this.createBarChart();
    this.createBarChart2();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['E1', 'E2', 'E3', 'E4',],
        datasets: [{
          label: 'Viewers in millions',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createBarChart2() {
    this.bars2 = new Chart(this.barChart2.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



}
