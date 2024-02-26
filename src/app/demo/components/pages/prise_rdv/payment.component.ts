import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Facture } from 'src/app/demo/interfaces/facture';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';
import { TokenService } from 'src/app/demo/service/token/token.service';

@Component({
	templateUrl:'./payment.component.html',
	providers:[MessageService]
})
export class PaymentComponent implements OnInit{

	cardName:string;
	cardNumber:string;
	cardExpDate: Date;
	cvvCard:string;
	clientId : string = localStorage.getItem("clientId");
	prix: string = localStorage.getItem("prix")
	//facture: any;
	servId: string;
	factRetour:any;
	constructor(
		private router: Router,
		private messageService: MessageService,
		private rdvService: RendezVousService,
		private tokenService: TokenService
	) { }

	ngOnInit(): void {
		//this.facture = this.rdvService.getData();
		this.servId = this.router.url.split('/')[3];
	}

	prevPage() {
		this.router.navigate(['pages/rdv/'+this.servId+'/confirmation']);
	}


	public paiement(): void{
		this.factRetour = {
			service: localStorage.getItem("serviceId"),
			personnel: localStorage.getItem("employe"),
			dateRendezVous: localStorage.getItem("dateRendezVous")
		}
		this.rdvService.paiement(localStorage.getItem("factureId"),this.clientId,this.factRetour).subscribe(
			(response:CustomResponse) => {
				console.log(response);

				localStorage.removeItem('employe');
				localStorage.removeItem('dateRendezVous');
				localStorage.removeItem('service');
				localStorage.removeItem('nomEmploye');
				localStorage.removeItem('serviceId');
				localStorage.removeItem('factureId');
				localStorage.removeItem('prix');
				localStorage.removeItem('clientId');

				this.messageService.add({severity:'success', summary:'Success', detail:response.message, life: 3000});
			},
			(error:HttpErrorResponse) => {
				this.messageService.add({severity:'error', summary:'Error', detail:error.error.message, life: 3000});
			}
		)
	}
}
