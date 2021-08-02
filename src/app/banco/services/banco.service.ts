import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RESTBankResponse } from '../interfaces/banco.interface';
import { Destinatario } from '../interfaces/destinatario.interface';

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
}
