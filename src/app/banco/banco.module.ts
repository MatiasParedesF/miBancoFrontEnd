import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NuevoDestinatarioComponent } from './pages/nuevo-destinatario/nuevo-destinatario.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { HistorialComponent } from './pages/historial/historial.component';




@NgModule({
  declarations: [
    NuevoDestinatarioComponent,
    TransferenciaComponent,
    HistorialComponent
  ],
  exports:[
    NuevoDestinatarioComponent,
    TransferenciaComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BancoModule { }
