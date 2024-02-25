import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
	templateUrl:'./payment.component.html',
})
export class PaymentComponent implements OnInit{

	rdvId: string;
	constructor(private router: Router,private messageService: MessageService) { }
	ngOnInit(): void {
		this.rdvId = this.router.url.split('/')[3];
	}

	prevPage() {
		this.router.navigate(['pages/rdv/'+this.rdvId+'/confirmation']);
	}

	valider(){
		this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService', life: 3000});
	}
}
