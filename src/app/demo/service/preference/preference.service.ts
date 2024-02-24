import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preference } from '../../interfaces/preference';
import { PreferenceSpec } from '../../interfaces/preferenceSpec';
import { CustomResponse } from '../../interfaces/customResponse';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeFavoris(clientId:String): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/favoris/${clientId}`,{headers:this.headers});
    
  }

  public ajoutFavoris(dataFav:PreferenceSpec): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/favoris`,dataFav,{headers:this.headers});
    
  }

  public updateFavoris(favId:String,personnel:Object): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/favoris/${favId}`,personnel,{headers:this.headers});
    
  }

  public updateStatutFavoris(favId:String,statut:Number): Observable<CustomResponse> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut.toString());

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/favoris/${favId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });
    
  }

}
