import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Client } from 'src/app/demo/interfaces/client';
import { LocalStorageService } from 'ngx-webstorage';
import { RegisterService } from 'src/app/demo/service/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]],
      confirmPassword: ['', Validators.required],
      nom: ['', Validators.required] ,
      prenom: ['', Validators.required]
    }
  )
  
  load: Boolean = false;
  mailError: string;
  mdpError: string;
  nomError: string;
  prenomError: string;
  registerError: string;

  client: Client = {
    id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: ''
  };

  constructor(private fb:FormBuilder,private route: Router, private registerService: RegisterService,  private localStorage:LocalStorageService) {}

  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }

  get nom() {
    return this.registerForm.controls['nom'];
  }
  get prenom() {
    return this.registerForm.controls['prenom'];
  }

  public register(): void{
    const data = this.registerForm.value;

    this.client.mail = data.email ?? '';
    this.client.mdp = data.password ?? '';
    this.client.nom = data.nom ?? '';
    this.client.prenom = data.prenom ?? '';

    this.load = true;

    this.registerService.inscription(this.client).subscribe(

      (response:any) =>{
        if(response.status === 201) {

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', response.data.type);

          this.route.navigate(['pages/dashboard']);

        }
      },
      (error: HttpErrorResponse) => {
        
        if(error.error.message.mail) {
          this.mailError = error.error.message.mail;
        }
        if(error.error.message.mdp) {
          this.mdpError = error.error.message.mdp;
        }
        if(error.error.message.nom) {
          this.nomError = error.error.message.nom;
        }
        if(error.error.message.prenom) {
          this.prenomError = error.error.message.prenom;
        }
      }

    ).add(() => {
      this.load = false;
    })
  }
}