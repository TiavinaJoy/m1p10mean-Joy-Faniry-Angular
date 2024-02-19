import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../../interfaces/service';
import { ServiceSearch } from '../../interfaces/serviceSearch';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }
//
  public listeServices(service:ServiceSearch,page: Number, perPage: Number): Observable<Service[]> {

    let queryParams = new HttpParams();
    console.log('SERVICE ', page);
    console.log('SERVICE per page', perPage);
    
    queryParams= queryParams.append("prixMin",service.prixMin.toString() ?? '');
    queryParams= queryParams.append("prixMax",service.prixMax.toString() ?? '');
    queryParams= queryParams.append("comMin",service.comMin.toString() ?? '');
    queryParams= queryParams.append("comMax",service.comMax.toString() ?? '');
    queryParams= queryParams.append("dureeMin",service.dureeMin.toString() ?? '');
    queryParams= queryParams.append("dureeMax",service.dureeMax.toString() ?? '');
    queryParams= queryParams.append("statut",service.statut ? service.statut.toString() : '');
    queryParams= queryParams.append("nom",service.nom ?? '');
    queryParams= queryParams.append("description",service.description ?? '');
    queryParams= queryParams.append("categorie",service.categorie ?? '');
    queryParams= queryParams.append("page", page.toString() ?? '');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Service[]>(`${this.apiServerUrl}/service`,{
      headers:this.headers,
      params: queryParams
    });

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
