import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "login",
    component : LoginComponent
  },
  // {
  //   path: "register",
  //   component : RegisterComponent
  // },
  {
    path:"", redirectTo :"login", pathMatch :'full' 
    // rehefa ts mampiditra path le olona dia alefaso any am login
  },
  {
    path:"**", redirectTo: "login", pathMatch :'full'
    // mila alefa any am 404 not found fa aleo aloha ho any am login mandrapa
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
