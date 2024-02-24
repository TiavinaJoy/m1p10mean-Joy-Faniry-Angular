import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VitrineComponent } from './vitrine.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VitrineComponent }
	])],
	exports: [RouterModule]
})
export class VitrineRoutingModule { }
