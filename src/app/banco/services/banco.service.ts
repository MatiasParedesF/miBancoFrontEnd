import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RESTBankResponse } from '../interfaces/banco.interface';
import { Destinatario } from '../interfaces/destinatario.interface';
import { HistorialTransferencias } from '../interfaces/Historialtransferencia.interface'
import { Transferencia } from '../interfaces/transferencia.interface';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private _servicioBancoUrl : string='https://bast.dev/api/banks.php';
  private _servicioApiUrl   : string='http://mibanco.germen.cl/api';
  
  constructor(private http:HttpClient) { }

  obtenerBancos(){
    return this.http.get<RESTBankResponse>(this._servicioBancoUrl);
  }
  obtenerDestinatarios(termino:string):Observable<Destinatario[]>{
    const url=`${this._servicioApiUrl}/destinatario`;
    const params= new HttpParams().set('termino',termino);
    return this.http.get<Destinatario[]>(url, {params})
  }
  
  obtenerHistorial():Observable<HistorialTransferencias[]>{
    const url=`${this._servicioApiUrl}/historial`;
    const params= new HttpParams().set('usuario','12345678');
    return this.http.get<HistorialTransferencias[]>(url,{params})
  }

  nuevoDestinatario(destinatario:Destinatario):Observable<Destinatario>{
    const url=`${this._servicioApiUrl}/destinatario`;
    return this.http.post<Destinatario>(url, {destinatario});
  }

  nuevaTransferencia(transferencia:Transferencia):Observable<Transferencia>{
    const url=`${this._servicioApiUrl}/transferencia`;
    return this.http.post<Transferencia>(url, {transferencia});
  }


}
