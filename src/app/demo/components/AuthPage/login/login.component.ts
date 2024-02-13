import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
//import { Client } from '../../interfaces/client';
import { Router } from '@angular/router';
//import { LocalStorageService } from 'ngx-webstorage';
//import { LoginService } from '../../services/loginService/login.service';
//import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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

 /* client: Client = {
    id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: ''
  };*/

  constructor(private fb:FormBuilder, private route: Router/*, private loginService: LoginService, private localStorage:LocalStorageService*/) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  public connexion(): void{
    console.log('Test');
    this.route.navigate(['pages/dashboard']);
    /*const data = this.loginForm.value;
    console.log(data);
    this.client.mail = data.email ?? '';
    this.client.mdp = data.password ?? '';

    this.loginService.connexion(this.client).subscribe(

      (response:any) =>{
        if(response.status === 200) {

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', 'client');

          this.route.navigate(['/vitrine']);
          
        }else{
          console.log("ELSE ",response.message);
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )*/
  }
}
