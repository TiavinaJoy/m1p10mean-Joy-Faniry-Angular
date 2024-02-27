import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../interfaces/customResponse';
import { RendezVousSpec } from '../../interfaces/rendezVousSpec';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CommisionServiceService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  private empId : string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
  
  constructor(private http: HttpClient,private tokenService: TokenService) { }

  public listeCommission(rdv:RendezVousSpec,page: Number, perPage: Number): Observable<CustomResponse> {

    let queryParams = new HttpParams();

      if(rdv.dateRendezVousMin || rdv.dateRendezVousMax){
        if(rdv.dateRendezVousMin && rdv.dateRendezVousMax) {

          queryParams= queryParams.append("dateRendezVousMin", rdv.dateRendezVousMin ?? '');
          queryParams= queryParams.append("dateRendezVousMax", rdv.dateRendezVousMax ?? '');

        }
        else if (rdv.dateRendezVousMin && !rdv.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMin", rdv.dateRendezVousMin ?? '');
        else if (!rdv.dateRendezVousMin && rdv.dateRendezVousMax) queryParams= queryParams.append("dateRendezVousMax", rdv.dateRendezVousMax ?? '');
    }
    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');
    console.log(queryParams)
  
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/personnel/${this.empId}/commission`,{
      headers:this.headers,
      params: queryParams
    });

  }
}
