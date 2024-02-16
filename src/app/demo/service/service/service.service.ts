import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeServices(page:Number): Observable<Service> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Service>(`${this.apiServerUrl}/service/${page}`,{headers:this.headers});

  }

  public updateStatutService(serviceId:String, statut: number): Observable<any> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut);
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<any>(`${this.apiServerUrl}/service/${serviceId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });

  }

  public addService(service:Service): Observable<Service> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<Service>(`${this.apiServerUrl}/service`,service, {headers: this.headers});

  }

  public updateService(service:Service): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<any>(`${this.apiServerUrl}/service/${service.id}`,service, {headers: this.headers});

  }

}
