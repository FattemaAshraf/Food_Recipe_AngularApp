import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from 'src/app/models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _httpClient: HttpClient) { }
   onLogin(data :Ilogin){
    return this._httpClient.post('Users/Login', data);
   }
   onRequestResetPassword(data : string){
    return this._httpClient.post('Reset/Request', {email:data});
   }
}
