import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,  FormGroup,  Validators } from '@angular/forms';
//import { RegisterService } from '../../services/registerService/register.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Client } from '../../interfaces/client';
//import {LocalStorageService} from 'ngx-webstorage';

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
    },
    {
      validators: this.passwordMatchValidator,
    }
  )

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get("confirmPassword")?.value ? null : { mismatch : true};
  }

  mailError: string = '';
  passwordError: string = '';
  nomError: string = 'Veuillez inserer votre nom.';
  prenomError: string = 'Veuillez inserer votre prénom.';

  /*client: Client = {
    id: '',
    mail: '',
    mdp: '',
    nom: '',
    prenom: ''
  };*/

  constructor(private fb:FormBuilder,private route: Router/*, private registerService: RegisterService,  private localStorage:LocalStorageService*/) {}

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
    this.route.navigate(['pages/vitrine']);
    /*const data = this.registerForm.value;

    this.client.mail = data.email ?? '';
    this.client.mdp = data.password ?? '';
    this.client.nom = data.nom ?? '';
    this.client.prenom = data.prenom ?? '';

    this.registerService.inscription(this.client).subscribe(

      (response:any) =>{
        if(response.status === 201) {

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
