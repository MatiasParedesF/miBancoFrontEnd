import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators'
import { BancoService } from '../../services/banco.service';
import { Destinatario } from '../../interfaces/destinatario.interface';
import { Transferencia } from '../../interfaces/transferencia.interface';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styles: [ ]
})
export class TransferenciaComponent implements OnInit {

  termino:string='';
  hayError:boolean=false;
  hayErrorSinDestinatario:boolean=false;
  hayErrorTransferencia:boolean=false;
  hayErrorMonto:boolean=false;
  transferenciaExitosa:boolean=false;
  destinatarios:Destinatario[]=[];
  destinatario:Destinatario={_id:'',nombre:'',run:'',dv:'',banco:[{nombre:'',id:''}],cuenta:[{tipo:'',numero:''}],usuario:'',correo:'',telefono:''};
  transferencia:Transferencia={fecha:new Date(),usuario:'12345678',cuenta:'1234567891',monto:0,destinatario:''}

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
    this.hayErrorTransferencia=false;
    this.hayErrorSinDestinatario=false;
    this.bancoService.obtenerDestinatarios(termino)
    .subscribe(
      (destinatarios)=>{
        this.destinatarios=destinatarios;
        this.destinatariosSugeridos=destinatarios;},
      (err)=>{this.destinatariosSugeridos=[]; this.mostrarSugerencias=false; this.hayError=true;this.hayErrorSinDestinatario=true}
    )
  }
  
  asignaDestinatario(destinatario:Destinatario){
    this.destinatario=destinatario;
    this.hayError=false;
    this.mostrarSugerencias=false;
    this.transferencia.destinatario=destinatario._id;
  }

  compruebaMonto(){
    this.hayErrorMonto=false;
    if(this.transferencia.monto>0){
      this.hayErrorMonto=false;
    }
    else{
      this.hayErrorMonto=true;
    }
  }
  transferir(){
    this.hayErrorMonto=false;
    this.hayErrorSinDestinatario=false;
    this.hayErrorTransferencia=false;
    if(this.transferencia.monto<=0){
      this.hayErrorMonto=true;
    }
    else{
      this.bancoService.nuevaTransferencia(this.transferencia).subscribe(
        (res)=>{
          console.log(res);
          this.transferenciaExitosa=true;
          this.transferencia={fecha:new Date(),usuario:'12345678',cuenta:'1234567891',monto:0,destinatario:''}
          this.destinatario={_id:'',nombre:'',run:'',dv:'',banco:[{nombre:'',id:''}],cuenta:[{tipo:'',numero:''}],usuario:'',correo:'',telefono:''};

        },
        (err)=>{
          this.hayErrorTransferencia=true
        }
      )
    }
  }

}
