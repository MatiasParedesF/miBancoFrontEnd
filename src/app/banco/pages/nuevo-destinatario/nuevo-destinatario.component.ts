import { Component, Input} from '@angular/core';
import { Bank } from '../../interfaces/banco.interface';
import { BancoService } from '../../services/banco.service';
import { Destinatario } from '../../interfaces/destinatario.interface';


@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styles: [
  ]
})
export class NuevoDestinatarioComponent {
  @Input() banco: Bank={name:'',id:''}
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

  asignaBanco(){
    console.log(this.banco);

  }

  crearDestinatario(){

    console.log(this.destinatario);

  }


}
