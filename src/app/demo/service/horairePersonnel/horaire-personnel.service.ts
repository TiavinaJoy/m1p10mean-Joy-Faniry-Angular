import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { HorairePersonnelSearch } from '../../interfaces/horairePersonnelSearch';
import { HorairePersonnel } from '../../interfaces/horairePersonnel';

@Injectable({
  providedIn: 'root'
})
export class HorairePersonnelService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeHorairePersonnel(filtre: HorairePersonnelSearch,personnelId: string,page: Number, perPage:Number): Observable<CustomResponse> {

    let queryParams = new HttpParams();

      if(filtre.dateDebutMin || filtre.dateDebutMax){
        if(filtre.dateDebutMin && filtre.dateDebutMax) {

          queryParams= queryParams.append("dateDebutMin", filtre.dateDebutMin ?? '');
          queryParams= queryParams.append("dateDebutMax", filtre.dateDebutMax ?? '');

        }
        else if (filtre.dateDebutMin && !filtre.dateDebutMax) queryParams= queryParams.append("dateDebutMin", filtre.dateDebutMin ?? '');
        else if (!filtre.dateDebutMin && filtre.dateDebutMax) queryParams= queryParams.append("dateDebutMax", filtre.dateDebutMax ?? '');
    }
    if(filtre.dateFinMax || filtre.dateFinMin){
        if(filtre.dateFinMin && filtre.dateFinMax) {
          queryParams= queryParams.append("dateFinMin", filtre.dateFinMin ?? '');
          queryParams= queryParams.append("dateFinMax", filtre.dateFinMax ?? '');
        }
        else if (filtre.dateFinMin && !filtre.dateFinMax) queryParams= queryParams.append("dateFinMin", filtre.dateFinMin ?? '');
        else if (!filtre.dateFinMin && filtre.dateFinMax) queryParams= queryParams.append("dateFinMax", filtre.dateFinMax ?? '');
    }

    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/horaire/${personnelId}/search`,{
      headers:this.headers,
      params: queryParams
    });
    
  }

  public addHorairePersonnel(horaire:HorairePersonnel): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/horaire/${horaire.personnel}`,horaire, {headers: this.headers});

  }
}
