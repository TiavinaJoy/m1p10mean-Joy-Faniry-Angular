import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeSpec } from '../../interfaces/employeSpec';
import { Utilisateur } from '../../interfaces/utilisateur';
import { CustomResponse } from '../../interfaces/customResponse';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(
    private http: HttpClient
  ) { }

  public addEmploye(employe:EmployeSpec): Observable<EmployeSpec> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<EmployeSpec>(`${this.apiServerUrl}/personnel`,employe, {headers: this.headers});

  }

  public listeRole(): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<any>(`${this.apiServerUrl}/role`, {headers: this.headers});

  }

  public detailsEmploye(id:string): Observable<Utilisateur> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Utilisateur>(`${this.apiServerUrl}/personnel/${id}`, {headers: this.headers});

  }

  public updateEmployeSimple(employeId:String,employe:Utilisateur): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<any>(`${this.apiServerUrl}/personnel/${employeId}`,employe, {headers: this.headers});

  }

  public listeEmploye(): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/personnel/all`, {headers: this.headers});

  }
}
