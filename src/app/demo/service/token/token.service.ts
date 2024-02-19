import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public decodeToken(token:string) {
    return jwtDecode(token);    
  }
}
