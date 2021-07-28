import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RESTBankResponse, Bank } from '../interfaces/banco.interface';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private _servicioUrl: string='https://bast.dev/api/banks.php';
  
  constructor(private http:HttpClient) { }

  obtenerBancos(){
    return this.http.get<RESTBankResponse>(this._servicioUrl);
  }
}
