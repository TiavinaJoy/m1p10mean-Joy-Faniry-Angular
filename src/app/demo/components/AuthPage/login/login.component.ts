import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Client } from 'src/app/demo/interfaces/client';
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

  client: Client = {
    id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: ''
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

    this.client.mail = data.email ?? '';
    this.client.mdp = data.password ?? '';

    this.load = true;
    
    this.loginService.connexion(this.client).subscribe(
      
      (response:any) =>{
        if(response.status === 200) {

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', response.data.type);
          
          if(response.data.type == 'client') {  
            this.route.navigate(['pages/vitrine']);
          } else if(response.data.type == 'manager') {
            this.route.navigate(['pages/dashboard']);
          } else if (response.data.type == 'employe') {
            this.route.navigate(['pages/rdv/emp']);
          }

        }
      },
      (error: HttpErrorResponse) => {
        this.loginError = error.error.message;
      }
    ).add(() => {
      this.load = false;
    })
  }
}
