import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { Observable } from 'rxjs';
import { RendezVousSpec } from '../../interfaces/rendezVousSpec';
import { RendezVous } from '../../interfaces/rendezVous';
import { DatePipe } from '@angular/common';
import { Facture } from '../../interfaces/facture';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  private data:any;
  
  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  public listeRdvClient(filtreRdvClient:RendezVousSpec,page: Number, perPage: Number, clientId:string): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();
console.log(page," ",perPage)
      if(filtreRdvClient.dateRendezVousMin || filtreRdvClient.dateRendezVousMax){
        if(filtreRdvClient.dateRendezVousMin && filtreRdvClient.dateRendezVousMax) {

          queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateRendezVousMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateRendezVousMax ?? '');

        }
        else if (filtreRdvClient.dateRendezVousMin && !filtreRdvClient.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateRendezVousMin ?? '');
        else if (!filtreRdvClient.dateRendezVousMin && filtreRdvClient.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateRendezVousMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');
     
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/client/${clientId}`,{
      headers:this.headers,
      params: queryParams
    });
    
  }

  public listeRdvPerso(filtreRdvPerso:RendezVousSpec,page: Number, perPage: Number, personnelId:string): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();

      if(filtreRdvPerso.dateRendezVousMin || filtreRdvPerso.dateRendezVousMax){
        if(filtreRdvPerso.dateRendezVousMin && filtreRdvPerso.dateRendezVousMax) {

          queryParams= queryParams.append("dateRendezVousMin", filtreRdvPerso.dateRendezVousMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", filtreRdvPerso.dateRendezVousMax ?? '');

        }
        else if (filtreRdvPerso.dateRendezVousMin && !filtreRdvPerso.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMin", filtreRdvPerso.dateRendezVousMin ?? '');
        else if (!filtreRdvPerso.dateRendezVousMin && filtreRdvPerso.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMax", filtreRdvPerso.dateRendezVousMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');
  
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/personnel/${personnelId}`,{
      headers:this.headers,
      params: queryParams
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

  public setData(data: any) {
    this.data = data;
  } 

  public getData():any {
    return this.data
  }

  public paiement(factureId:string,clientId:string,facture:any): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/paiement/facture/${factureId}/client/${clientId}`,facture,{headers:this.headers});
    
  }
}
