import { Component } from '@angular/core';
import { Bank, RESTBankResponse } from '../../interfaces/banco.interface';
import { BancoService } from '../../services/banco.service';
import { Destinatario } from '../../interfaces/destinatario.interface';

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styles: [
  ]
})
export class NuevoDestinatarioComponent {

  bancos: Bank[]=[];
  destinatario: Destinatario={
    _id:'',
    nombre:'',
    run:'',
    dv:'',
    correo:'',
    telefono:'',
    banco:[{nombre:'',id:''}],
    cuenta:[{tipo:'',numero:''}],
    usuario:''
  }

  constructor(private bancoService:BancoService) {
    this.bancoService.obtenerBancos().subscribe((resp)=>{
      this.bancos=resp.banks;
    })
  }

  
  listarBancos(){
    this.bancoService.obtenerBancos().subscribe((resp)=>{
      this.bancos=resp.banks;
    })
  }

  crearDestinatario(){


  }


}
