import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativas: number = 3

  public coracoes: Coracao[] = [
    new Coracao(true), new Coracao(true), new Coracao(true)
  ]

  constructor() { 
    //console.log(this.coracoes)
    //console.log(this.tentativas) 
  }

  ngOnInit(): void {
    //console.log('ngOnInit: ' + this.tentativas) 
  }

  ngOnChanges(): void {
    //console.log('ngOnChanges: ' + this.tentativas)

    //Lógica para decremento de corações
    if(this.tentativas !== this.coracoes.length){
      let indice = this.coracoes.length - this.tentativas 
      this.coracoes[indice - 1].cheio = false
    }
  }

}
