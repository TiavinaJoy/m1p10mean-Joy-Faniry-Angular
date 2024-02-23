import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RdvClientComponent } from './rdvClient.component';
import { PaymentComponent } from './payment.component';
import { ConfirmationComponent } from './confirmation.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PersonalComponent } from './personal.component';
import { CalendrierClientComponent } from './calendrierClient.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { DragDropModule } from 'primeng/dragdrop';
@NgModule({
	imports: [
		CommonModule,
		BreadcrumbModule,
		MenubarModule,
		TabMenuModule,
		StepsModule,
		TieredMenuModule,
		MenuModule,
		ButtonModule,
		ContextMenuModule,
		MegaMenuModule,
		PanelMenuModule,
		InputTextModule,
		/*Calendrier */
		FullCalendarModule,
		DragDropModule,
		/*Personal */
		FormsModule,
		ListboxModule,
		DropdownModule,
		MultiSelectModule,
		SelectButtonModule,
		CascadeSelectModule,
		DialogModule,
		CalendarModule,
		CardModule,
		MessagesModule,
		InputNumberModule,
		/*Payement */
		RouterModule.forChild([
			{
				path: '', component: RdvClientComponent, children: [
					{ path: '', redirectTo: 'personal', pathMatch: 'full' },
					{ path: 'personal', component: PersonalComponent },
					{ path: 'calendar', component: CalendrierClientComponent },
					{ path: 'confirmation', component: ConfirmationComponent },
					{ path: 'payment', component: PaymentComponent }
				]
			}
		])
	],
	declarations: [
		RdvClientComponent,
		CalendrierClientComponent,
		ConfirmationComponent,
		PaymentComponent,
		PersonalComponent
	],
	providers: [
		MessageService
	],
	exports: [RouterModule]
})
export class RdvClientModule { }
