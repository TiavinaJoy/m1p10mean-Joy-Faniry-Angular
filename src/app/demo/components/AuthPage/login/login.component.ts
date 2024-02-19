import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import * as removeAccents from 'remove-accents';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { LoginService } from 'src/app/demo/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]]
  })

  loginError: string;
  load: Boolean = false;

  user: Utilisateur = {
    id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: '',
    statut: false,
    role: null,
    infoEmploye: null,
    confirmMdp: undefined
  };

  constructor(private fb:FormBuilder, private route: Router, private loginService: LoginService, private localStorage:LocalStorageService) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  public connexion(): void{

    const data = this.loginForm.value;
    var typeUser = '';

    this.user.mail = data.email ?? '';
    this.user.mdp = data.password ?? '';

    this.load = true;
    
    this.loginService.connexion(this.user).subscribe(
      
      (response:any) =>{
        if(response.status === 200) {

          typeUser = removeAccents(response.data.type).toLocaleLowerCase();
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', typeUser);
          
          if(typeUser == 'client') {  
            this.route.navigate(['pages/vitrine']);
          } else if(typeUser== 'manager') {
            this.route.navigate(['pages/dashboard']);
          } else if (typeUser == 'employe') {
            this.route.navigate(['pages/rdv/emp']);
          }

        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loginError = error.error.message;
      }
    ).add(() => {
      this.load = false;
    })
  }
}
