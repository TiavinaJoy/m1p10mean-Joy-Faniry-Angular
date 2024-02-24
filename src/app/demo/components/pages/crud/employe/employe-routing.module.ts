import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeComponent } from './employe.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmployeComponent }
	])],
	exports: [RouterModule]
})
export class EmployeRoutingModule { }
