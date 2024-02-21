import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Utilisateur } from '../../interfaces/utilisateur';
import { Observable } from 'rxjs';
import { CustomResponse } from '../../interfaces/customResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public inscription(user:Utilisateur): Observable<CustomResponse> {

    return this.http.post<CustomResponse>(`${this.apiUrl}/utilisateur/register`,user);

  }
  
}
