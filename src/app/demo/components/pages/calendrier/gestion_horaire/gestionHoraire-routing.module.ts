import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionHoraireComponent } from './gestionHoraire.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GestionHoraireComponent }
	])],
	exports: [RouterModule]
})
export class GestionHoraireRoutingModule { }
