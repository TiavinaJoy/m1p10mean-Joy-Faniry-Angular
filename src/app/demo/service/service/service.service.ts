import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../../interfaces/service';
import { ServiceSearch } from '../../interfaces/serviceSearch';
import { CustomResponse } from '../../interfaces/customResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeServices(service:ServiceSearch,page: Number, perPage: Number): Observable<Service[]> {

    let queryParams = new HttpParams();

    if(service.prixMin || service.prixMax) {
      if(service.prixMin && service.prixMax) { 
        queryParams= queryParams.append("prixMin",service.prixMin.toString() ?? '');
        queryParams= queryParams.append("prixMax",service.prixMax.toString() ?? '');
      }
      else if (service.prixMin && !service.prixMax) queryParams= queryParams.append("prixMin",service.prixMin.toString() ?? '');
      else if (!service.prixMin && service.prixMax) queryParams= queryParams.append("prixMax",service.prixMax.toString() ?? '');
    }

    if(service.comMin || service.comMax) {
      if(service.comMin && service.comMax) { 
        queryParams= queryParams.append("comMin",service.comMin.toString() ?? '');
        queryParams= queryParams.append("comMax",service.comMax.toString() ?? '');
      }
      else if (service.comMin && !service.comMax) queryParams= queryParams.append("comMin",service.comMin.toString() ?? '');
      else if (!service.comMin && service.comMax) queryParams= queryParams.append("comMax",service.comMax.toString() ?? '');
    }

    if(service.dureeMin || service.dureeMax) {
      if(service.dureeMin && service.dureeMax) { 
        queryParams= queryParams.append("dureeMin",service.dureeMin.toString() ?? '');
        queryParams= queryParams.append("dureeMax",service.dureeMax.toString() ?? '');
      }
      else if (service.dureeMin && !service.dureeMax) queryParams= queryParams.append("dureeMin",service.dureeMin.toString() ?? '');
      else if (!service.dureeMin && service.dureeMax) queryParams= queryParams.append("dureeMax",service.dureeMax.toString() ?? '');
    }
    
    if(service.nom) queryParams= queryParams.append("nom",service.nom ?? '');
    if(service.description) queryParams= queryParams.append("description",service.description ?? '');
    if(service.statut && (service.statut == 0 || service.statut == 1)) queryParams= queryParams.append("statut",service.statut.toString());
    if(service.categorie) queryParams= queryParams.append("categorie",service.categorie ?? '');

    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Service[]>(`${this.apiServerUrl}/service`,{
      headers:this.headers,
      params: queryParams
    });

  }

  public updateStatutService(serviceId:String, statut: number): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut);

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/service/${serviceId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });

  }

  public addService(service:Service): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/service`,service, {headers: this.headers});

  }

  public updateService(service:Service): Observable<CustomResponse> { 
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/service/${service._id}`,service, {headers: this.headers});

  }

  public tousLesServices(): Observable<any> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<any>(`${this.apiServerUrl}/services`, {headers: this.headers});

  }
//Offre spéciales
  public listeOffresSpeciales(offre:ServiceSearch,page: Number, perPage: Number): Observable<CustomResponse> {

    let queryParams = new HttpParams();

    if(offre.prixMin || offre.prixMax) {
      if(offre.prixMin && offre.prixMax) { 
        queryParams= queryParams.append("prixMin",offre.prixMin.toString() ?? '');
        queryParams= queryParams.append("prixMax",offre.prixMax.toString() ?? '');
      }
      else if (offre.prixMin && !offre.prixMax) queryParams= queryParams.append("prixMin",offre.prixMin.toString() ?? '');
      else if (!offre.prixMin && offre.prixMax) queryParams= queryParams.append("prixMax",offre.prixMax.toString() ?? '');
    }

    if(offre.comMin || offre.comMax) {
      if(offre.comMin && offre.comMax) { 
        queryParams= queryParams.append("comMin",offre.comMin.toString() ?? '');
        queryParams= queryParams.append("comMax",offre.comMax.toString() ?? '');
      }
      else if (offre.comMin && !offre.comMax) queryParams= queryParams.append("comMin",offre.comMin.toString() ?? '');
      else if (!offre.comMin && offre.comMax) queryParams= queryParams.append("comMax",offre.comMax.toString() ?? '');
    }

    if(offre.dureeMin || offre.dureeMax) {
      if(offre.dureeMin && offre.dureeMax) { 
        queryParams= queryParams.append("dureeMin",offre.dureeMin.toString() ?? '');
        queryParams= queryParams.append("dureeMax",offre.dureeMax.toString() ?? '');
      }
      else if (offre.dureeMin && !offre.dureeMax) queryParams= queryParams.append("dureeMin",offre.dureeMin.toString() ?? '');
      else if (!offre.dureeMin && offre.dureeMax) queryParams= queryParams.append("dureeMax",offre.dureeMax.toString() ?? '');
    }
    
    if(offre.nom) queryParams= queryParams.append("nom",offre.nom ?? '');
    if(offre.description) queryParams= queryParams.append("description",offre.description ?? '');
    if(offre.statut && (offre.statut == 0 || offre.statut == 1)) queryParams= queryParams.append("statut",offre.statut.toString());
    if(offre.categorie) queryParams= queryParams.append("categorie",offre.categorie ?? '');

    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/offre`,{
      headers:this.headers,
      params: queryParams
    });

  }

  public updateStatutOffreSpeciale(serviceId:String, statut: number): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut);

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/offre/${serviceId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });

  }

  public updateOffreSpeciale(offre:Service): Observable<CustomResponse> { 
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/offre/${offre._id}`,offre, {headers: this.headers});

  }

  public addOffreSpeciale(offre:Service): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/offre`,offre, {headers: this.headers});

  }

  public allOffresSpeciales(offre:ServiceSearch,page: Number, perPage: Number): Observable<CustomResponse> {

    let queryParams = new HttpParams();
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/offre`,{
      headers:this.headers,
      params: queryParams
    });

  }
}
