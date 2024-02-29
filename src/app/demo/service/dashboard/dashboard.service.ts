import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { RendezVousSpec } from '../../interfaces/rendezVousSpec';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public caMensuel(): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/caMensuel`,{headers:this.headers});
    
  }

  public caJournalier(): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/caJournalier`,{headers:this.headers});
    
  }

  public rdvParJour(): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/rdvParJour`,{headers:this.headers});
    
  }

  public tempsMoyenTravail(): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/avgWorkTime`,{headers:this.headers});
    
  }

  public benefice(): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/profitMensuel`,{headers:this.headers});
    
  }

  public rdvParMois(rdv:RendezVousSpec): Observable<CustomResponse> {

    let queryParams = new HttpParams();

      if(rdv.dateRendezVousMin || rdv.dateRendezVousMax){
        if(rdv.dateRendezVousMin && rdv.dateRendezVousMax) {

          queryParams= queryParams.append("dateRendezVousMin", rdv.dateRendezVousMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", rdv.dateRendezVousMax ?? '');

        }
        else if (rdv.dateRendezVousMin && !rdv.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMin", rdv.dateRendezVousMin ?? '');
        else if (!rdv.dateRendezVousMin && rdv.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMax", rdv.dateRendezVousMax ?? '');
    }

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/dash/rdvParMois`,{
      headers:this.headers,
      params: queryParams
    });
    
  }

}
