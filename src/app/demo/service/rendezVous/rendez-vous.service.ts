import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeRdvClient(filtreRdvClient:RendezVousService,page: Number, perPage: Number, clientId:string): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();

      /*if(filtreRdvClient.dateRendezVousMin || filtreRdvClient.dateDebutMax){
        if(filtreRdvClient.dateRendezVousMin && filtreRdvClient.dateDebutMax) {

          queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateRendezVousMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateDebutMax ?? '');

        }
        else if (filtreRdvClient.dateRendezVousMin && !filtreRdvClient.dateDebutMax) queryParams= queryParams.append("dateRendezVousMin", filtreRdvClient.dateRendezVousMin ?? '');
        else if (!filtreRdvClient.dateRendezVousMin && filtreRdvClient.dateDebutMax) queryParams= queryParams.append("dateRendezVousMax", filtreRdvClient.dateDebutMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');*/
     
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/rendezVous/client/${clientId}`,{headers:this.headers});
    
  }
}
