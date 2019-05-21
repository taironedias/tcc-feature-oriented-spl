import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss'],
})
export class NivelComponent implements OnInit {

  niveis = ['1', '2', '3'];
  nivel: string;

  constructor() { }

  ngOnInit() { }

  valuesReset() {
    this.nivel = '-1';
  }

}
