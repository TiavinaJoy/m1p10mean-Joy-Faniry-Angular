
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../../interfaces/utilisateur';
import { CustomResponse } from '../../interfaces/customResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public connexion(user:Utilisateur): Observable<CustomResponse> {

    return this.http.post<CustomResponse>(`${this.apiUrl}/utilisateur/auth`,user);
    
  }
}
