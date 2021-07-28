import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { NuevoDestinatarioComponent } from './banco/pages/nuevo-destinatario/nuevo-destinatario.component';
import { TransferenciaComponent } from "./banco/pages/transferencia/transferencia.component";
import { HistorialComponent } from './banco/pages/historial/historial.component';


const routes:Routes=[
    {
        path:'',
        component:NuevoDestinatarioComponent,
        pathMatch:'full'
    },
    {
        path:'transferencia',
        component:TransferenciaComponent
    },
    {
        path:'historial',
        component:HistorialComponent
    },
    {
        path:'**',
        redirectTo:''
    }
]



@NgModule({
    exports:[RouterModule],
    imports:[
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule{}

