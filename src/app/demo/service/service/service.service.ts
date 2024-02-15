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
    /*Raha te hanao lien http://localhost:3000/service/?page=0 dia mampiasa ilau HttpParams */
    /*let queryParams = new HttpParams();
    queryParams = queryParams.append("page",0);*/
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));

    return this.http.get<Service>(`${this.apiServerUrl}/service/$page`,{headers:this.headers});
  }

  public updateStatutService(id:String): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<any>(`${this.apiServerUrl}/service/$id/statut`,null,{headers: this.headers});
    
  }
}
