import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {  Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { LocalStorageService } from 'ngx-webstorage';
import { RegisterService } from 'src/app/demo/service/register/register.service';
import { MessageService } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import * as removeAccents from 'remove-accents';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
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

  user: Utilisateur = {
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
    private registerService: RegisterService,  
    private localStorage:LocalStorageService,
    private messageService: MessageService,
  ) {}

  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get nom() {
    return this.registerForm.controls['nom'];
  }
  get prenom() {
    return this.registerForm.controls['prenom'];
  }

  public register(registerForm: FormGroup): void{

    const data = registerForm.value;

    this.user.mail = data.email ?? '';
    this.user.mdp = data.password ?? '';
    this.user.nom = data.nom ?? '';
    this.user.prenom = data.prenom ?? '';
    this.user.confirmMdp = data.confirmPassword ?? '';

    this.load = true;
    var typeUser = '';

    this.registerService.inscription(this.user).subscribe(

      (response:CustomResponse) =>{
        if(response.status === 201) {
          typeUser = removeAccents(response.data.user.role.intitule).toLocaleLowerCase();
          
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('type', typeUser);

          this.route.navigate(['pages/vitrine']);
        }
      },
      (error: HttpErrorResponse) => {
        if(error.message) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
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
