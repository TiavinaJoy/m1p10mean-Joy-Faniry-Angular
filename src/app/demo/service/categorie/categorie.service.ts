import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(private http: HttpClient) { }

  public listeCategorie(): Observable<Categorie> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Categorie>(`${this.apiServerUrl}/categorie`,{headers:this.headers});
    
  }

}
