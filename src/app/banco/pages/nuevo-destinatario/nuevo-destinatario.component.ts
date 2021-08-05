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
  bancos: Bank[]=[];
  hayError:boolean=false;
  hayDestinatario:boolean=false;
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

  verificaRun(){
    this.hayError=false;
    if(this.destinatario.run.indexOf("-")!=-1 && (this.destinatario.run.indexOf("-")===7 || this.destinatario.run.indexOf("-")===8) && this.destinatario.run.length>=8){
      var v=this.destinatario.run.split("-",2);
      this.destinatario.run=v[0];
      this.destinatario.dv=v[1];
      this.hayError=false;
    }
    else{
      this.hayError=true;
    }
  }

  crearDestinatario(){
    this.hayDestinatario=false;
    this.hayError=false;
    if(this.hayError){
      return;
    }
    else{
      this.bancoService.nuevoDestinatario(this.destinatario).subscribe(
        (destinatario)=>{
          this.destinatario={
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
          this.hayDestinatario=true;
        },(err)=>{
          this.hayError=true;
        }
      );
    }


  }


}
