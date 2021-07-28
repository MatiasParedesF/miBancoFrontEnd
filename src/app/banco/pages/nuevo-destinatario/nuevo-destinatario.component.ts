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
    nombre:'',
    rut:'',
    correo:'',
    telefono:'',
    banco:'',
    cuentaTipo:'',
    cuentaNumero:0
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
    console.log(this.destinatario);
  }


}
