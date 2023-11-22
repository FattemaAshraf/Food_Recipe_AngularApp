import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Ilogin } from 'src/app/models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  role:string | null='';
  constructor(private _httpClient: HttpClient) { }
  getProfile(){
    let encoded:any = localStorage.getItem('userToken');
    let decoded:any = jwtDecode(encoded);
    console.log(decoded.userGroup);
    console.log(decoded.userName);
    localStorage.setItem('role', decoded.userGroup )
    localStorage.setItem('userName', decoded.userName )
    this.getRole();
  }
  getRole(){
    if(localStorage.getItem('userToken') !== null
    && localStorage.getItem('role') ){
  this.role = localStorage.getItem('role')
    }
  }
   onLogin(data :Ilogin){
    return this._httpClient.post('Users/Login', data);
   }
   onRequestResetPassword(data : string){
    return this._httpClient.post('Users/Reset/Request', {email:data});
   }
   onResetPassword(data : string){
    return this._httpClient.post('Users/Reset', data);
   }
}
