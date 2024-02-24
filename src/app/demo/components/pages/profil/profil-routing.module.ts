import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  ProfilComponent } from './profil.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProfilComponent }
	])],
	exports: [RouterModule]
})
export class ProfilRoutingModule { }
