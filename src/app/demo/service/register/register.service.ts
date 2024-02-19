import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Utilisateur } from '../../interfaces/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public inscription(user:Utilisateur): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/client`,user);
  }
  
}
