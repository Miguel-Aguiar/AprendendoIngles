import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frase-mock'


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao:string = 'Traduza a frase'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase = new Frase('','')

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    //console.log(this.frases) 
    //this.rodadaFrase = this.frases[this.rodada] - Encapsular lógica repetida
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //console.log('Componente painel foi destruído')
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value 
    //console.log(this.resposta)
  }

  public verificarResposta(): void{
    //console.log('Verificar resposta: ' + this.resposta)
    
    //Verificação da resposta do usuário com a tradução da frase da rodada atual
    if(this.rodadaFrase.frasePtBr == this.resposta){
      //Trocar pergunta da rodada
      this.rodada++

      //Atualiza a barra de progresso
      this.progresso+= (100 / this.frases.length)

      //Lógica de vitória
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria')
      }

      //Atualizar o objeto rodadaFrase
      //this.rodadaFrase = this.frases[this.rodada]  - Encapsular lógica repetida
      this.atualizaRodada()

    }else{
      //console.log('Errou')
      //Decrementar o atributo tentativas
      this.tentativas--

      //Lógica de fracasso
      if(this.tentativas == -1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  public atualizaRodada(): void{
    this.rodadaFrase = this.frases[this.rodada]
    //Limpar resposta
    this.resposta = ''
  }

}
