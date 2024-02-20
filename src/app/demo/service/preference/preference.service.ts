import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preference } from '../../interfaces/preference';
import { PreferenceSpec } from '../../interfaces/preferenceSpec';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeFavoris(clientId:String): Observable<Preference> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Preference>(`${this.apiServerUrl}/favoris/${clientId}`,{headers:this.headers});
    
  }

  public ajoutFavoris(dataFav:PreferenceSpec): Observable<Preference> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<Preference>(`${this.apiServerUrl}/favoris`,dataFav,{headers:this.headers});
    
  }

  public updateFavoris(favId:String,personnel:Object): Observable<Preference> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<Preference>(`${this.apiServerUrl}/favoris/${favId}`,personnel,{headers:this.headers});
    
  }

  public updateStatutFavoris(favId:String,statut:Number): Observable<Preference> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut.toString());

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<Preference>(`${this.apiServerUrl}/favoris/${favId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });
    
  }

}
