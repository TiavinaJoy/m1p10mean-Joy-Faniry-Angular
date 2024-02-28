import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { Observable, of } from 'rxjs';
import { Depense, TypeDepense } from '../../interfaces/depense';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public addService(dep:Depense): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/depense`,dep, {headers: this.headers});
    
  }
  
  public listeDepense(): Observable<any> {
    return of(Object.keys(TypeDepense).map(key => ({ label: TypeDepense[key], value: key })));
  }
}
