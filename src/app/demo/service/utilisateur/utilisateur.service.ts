import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeSpec } from '../../interfaces/employeSpec';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public addEmploye(employe:EmployeSpec): Observable<EmployeSpec> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<EmployeSpec>(`${this.apiServerUrl}/personnel`,employe, {headers: this.headers});

  }

  public listeRole(): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<any>(`${this.apiServerUrl}/role`, {headers: this.headers});

  }
}
