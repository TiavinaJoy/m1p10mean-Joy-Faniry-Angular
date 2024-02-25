import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';

@Component({
	templateUrl:'./payment.component.html',
})
export class PaymentComponent implements OnInit{

	rdvId: string;
	constructor(
		private router: Router,
		private messageService: MessageService,
		private rdvService: RendezVousService
	) { }

	ngOnInit(): void {
		console.log(this.rdvService.getData());
		this.rdvId = this.router.url.split('/')[3];
	}

	prevPage() {
		this.router.navigate(['pages/rdv/'+this.rdvId+'/confirmation']);
	}

	valider(){
		this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService', life: 3000});
	}
}
