import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
	templateUrl:'./payment.component.html',
})
export class PaymentComponent {

	constructor(private router: Router,private messageService: MessageService) { }

	prevPage() {
		this.router.navigate(['pages/rdv/confirmation']);
	}

	valider(){
		this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
	}
}
