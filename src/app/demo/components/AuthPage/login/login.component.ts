import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MessageService } from 'primeng/api';
import * as removeAccents from 'remove-accents';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { LoginService } from 'src/app/demo/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['zjoytiavina@gmail.com', [Validators.required, Validators.email]],
    password: ['Mdpprom13.', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]]
  })

  loginError: string;
  load: Boolean = false;

  user: Utilisateur = {
    _id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: '',
    statut: false,
    role: null,
    infoEmploye: null,
    confirmMdp: undefined
  };

  constructor(
    private fb:FormBuilder, 
    private route: Router, 
    private loginService: LoginService, 
    private localStorage:LocalStorageService,
    private messageService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  public connexion(loginForm: FormGroup): void{

    const data = loginForm.value;
    var typeUser = '';

    this.user.mail = data.email ?? '';
    this.user.mdp = data.password ?? '';

    this.load = true;
    
    this.loginService.connexion(this.user).subscribe(
      
      (response:CustomResponse) =>{
        if(response.status === 200) {

          typeUser = removeAccents(response.data.type).toLocaleLowerCase();
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', typeUser);
          console.log("Fa ahoana ",response.data);
          console.log(typeUser)
          if(typeUser == 'client') {  
            this.route.navigate(['pages/vitrine']);
          } else if(typeUser== 'manager') {
            this.route.navigate(['pages/dashboard']);
          } else if (typeUser == 'employe') {
            this.route.navigate(['pages/employe/rdv']);
          }

        }
      },
      (error: HttpErrorResponse) => { 
        if(error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
        this.loginError = error.error.message;
      }
    ).add(() => {
      this.load = false;
    })
  }
}
