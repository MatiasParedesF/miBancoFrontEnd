import { Component } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Transferencias } from '../../interfaces/transferencia.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: [
  ]
})
export class HistorialComponent {

  listahistorial:Transferencias[]=[];

  constructor(private bancoService:BancoService) {
    this.listarHistorials()
  }

  listarHistorials(){
    this.bancoService.obtenerHistorial().subscribe((historial)=>{
      this.listahistorial=historial;
    })
  
    
  }

}
