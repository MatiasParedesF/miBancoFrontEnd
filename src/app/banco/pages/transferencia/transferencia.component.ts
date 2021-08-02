import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators'
import { BancoService } from '../../services/banco.service';
import { Destinatario, Banco } from '../../interfaces/destinatario.interface';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styles: [`
  $zindex-dropdown:1000;
  `
  ]
})
export class TransferenciaComponent implements OnInit {

  termino:string='';
  hayError:boolean=false;
  destinatarios:Destinatario[]=[];
  destinatario:Destinatario={_id:'',nombre:'',run:'',dv:'',banco:[{nombre:'',id:''}],cuenta:[{tipo:'',numero:''}],usuario:'',correo:'',telefono:''};


  debouncer: Subject<string> =new Subject();

  mostrarSugerencias:boolean=false;
  destinatariosSugeridos: Destinatario[]=[];



  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.debouncer.pipe(
      debounceTime(300))
    .subscribe((valor=>{
      this.sugerencias(valor);
    }))
  }

  buscarDestinatarios(){
    this.hayError=false; 
    this.bancoService.obtenerDestinatarios(this.termino)
    .subscribe(destinatarios=>{
      console.log(destinatarios);
      this.destinatarios=destinatarios;
    },(err)=>{
      this.hayError=true;
      this.destinatarios=[]
    })
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }

  sugerencias(termino:string){
    this.hayError=false;
    this.termino=termino;
    this.mostrarSugerencias=true;
    this.bancoService.obtenerDestinatarios(termino)
    .subscribe(
      (destinatarios)=>{
        this.destinatarios=destinatarios;
        this.destinatariosSugeridos=destinatarios;},
      (err)=>{this.destinatariosSugeridos=[]; this.mostrarSugerencias=false}
    )
  }
  
  asignaDestinatario(destinatario:Destinatario){
    this.destinatario=destinatario;
    this.hayError=false;
    this.mostrarSugerencias=false;
  }


}
