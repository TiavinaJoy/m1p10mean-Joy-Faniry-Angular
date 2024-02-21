import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeSpec } from '../../interfaces/employeSpec';
import { Utilisateur } from '../../interfaces/utilisateur';
import { CustomResponse } from '../../interfaces/customResponse';
import { UtilisateurSpec } from '../../interfaces/utilisateurSpec';
import { InfoEmploye } from '../../interfaces/infoEmploye';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private apiServerUrl = environment.apiBaseUrl;
  private headers : HttpHeaders;
  
  constructor(
    private http: HttpClient
  ) { }

  public addEmploye(employe:EmployeSpec): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.post<CustomResponse>(`${this.apiServerUrl}/personnel`,employe, {headers: this.headers});

  }

  public listeRole(): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/role`, {headers: this.headers});

  }

  public detailsEmploye(id:string): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/personnel/${id}`, {headers: this.headers});

  }

  public updateEmployeSimple(employeId:String,employe:Utilisateur): Observable<CustomResponse> {
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/personnel/${employeId}`,employe, {headers: this.headers});

  }

  public listeEmploye(): Observable<CustomResponse> {

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<CustomResponse>(`${this.apiServerUrl}/personnel/all`, {headers: this.headers});

  }

  public listePersonnel(employe:UtilisateurSpec,page: Number, perPage: Number): Observable<Utilisateur[]> {

    let queryParams = new HttpParams();

    if(!this.checkVide(employe)) 
    {
      console.log("Non vide dans le param");
      queryParams= queryParams.append("nom",employe.nom );
      queryParams= queryParams.append("prenom",employe.prenom );
      queryParams= queryParams.append("mail",employe.mail );
      queryParams= queryParams.append("statut",employe.statut );
      queryParams= queryParams.append("role",employe.role );
      queryParams= queryParams.append("salaireMin",employe.salaireMin );
      queryParams= queryParams.append("salaireMax",employe.salaireMax );
      queryParams= queryParams.append("dateEmbaucheMin",employe.dateEmbaucheMin );
      queryParams= queryParams.append("dateEmbaucheMax",employe.dateEmbaucheMax );
      queryParams= queryParams.append("finContratMin",employe.finContratMin );
      queryParams= queryParams.append("finContratMax", employe.finContratMax );
      queryParams= queryParams.append("service", employe.service );
    }

    queryParams= queryParams.append("page", page.toString() ?? '0');
    queryParams= queryParams.append("perPage", perPage.toString() ?? '10');

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/personnel`,{
      headers:this.headers,
      params: queryParams
    });

  }

  public  checkVide(obj: any): boolean {
    for (const key in obj) 
    {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
                return false;
            }
        }
    }
    return true;
  }
  
  public updateStatutEmploye(employeId:String, statut: number): Observable<CustomResponse> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("statut",statut);

    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/personnel/${employeId}/statut`,null, {
      headers: this.headers,
      params: queryParams
    });

  }

  public updateInfoEmploye(infoEmploye:any,personnelId:string): Observable<CustomResponse> { 
    
    this.headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));
    return this.http.put<CustomResponse>(`${this.apiServerUrl}/personnel/infoEmploye/${personnelId}`,infoEmploye, {headers: this.headers});

  }
}
