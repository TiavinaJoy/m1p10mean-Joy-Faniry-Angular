import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { Observable } from 'rxjs';
import { RendezVousSpec } from '../../interfaces/rendezVousSpec';
import { RendezVous } from '../../interfaces/rendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeRdvClient(filtreRdvClient:RendezVousSpec,page: Number, perPage: Number, clientId:string): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();

      if(filtreRdvClient.dateMin || filtreRdvClient.dateMax){
        if(filtreRdvClient.dateMin && filtreRdvClient.dateMax) {

          queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateMax ?? '');

        }
        else if (filtreRdvClient.dateMin && !filtreRdvClient.dateMax) queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateMin ?? '');
        else if (!filtreRdvClient.dateMin && filtreRdvClient.dateMax) queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');
     
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/client/${clientId}`,{
      headers:this.headers
      //params: queryParams
    });
    
  }


  public listeRdvPerso(filtreRdvPerso:RendezVousSpec,page: Number, perPage: Number, personnelId:string): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();

      if(filtreRdvPerso.dateMin || filtreRdvPerso.dateMax){
        if(filtreRdvPerso.dateMin && filtreRdvPerso.dateMax) {

          queryParams= queryParams.append("dateRendezVousMin", filtreRdvPerso.dateMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", filtreRdvPerso.dateMax ?? '');

        }
        else if (filtreRdvPerso.dateMin && !filtreRdvPerso.dateMax) queryParams= queryParams.append("dateRendezVousMin", filtreRdvPerso.dateMin ?? '');
        else if (!filtreRdvPerso.dateMin && filtreRdvPerso.dateMax) queryParams= queryParams.append("dateRendezVousMax", filtreRdvPerso.dateMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');
     
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/personnel/${personnelId}`,{
      headers:this.headers
      //params: queryParams
    });
    
  }

  public detailsRdv(rendezVousId: string): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/${rendezVousId}`,{headers:this.headers});
    
  }

  public addRdv(rdv:RendezVous):Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/rendezVous/${rdv.client}`,rdv,{headers:this.headers});
    
  }
}
