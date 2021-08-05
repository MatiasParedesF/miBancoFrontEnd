import { Component } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { HistorialTransferencias } from '../../interfaces/Historialtransferencia.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: [
  ]
})
export class HistorialComponent {
  hayError:boolean=false;

  listahistorial:HistorialTransferencias[]=[];

  constructor(private bancoService:BancoService) {
    this.listarHistorials()
  }

  listarHistorials(){
    this.hayError=false;
    this.bancoService.obtenerHistorial().subscribe((historial)=>{
      this.listahistorial=historial;
      this.hayError=false;
    },(err)=>{
      this.hayError=true;

    })
  
    
  }

}
