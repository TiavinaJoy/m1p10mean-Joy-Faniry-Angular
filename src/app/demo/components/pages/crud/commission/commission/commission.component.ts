import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Commission } from 'src/app/demo/interfaces/commission';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { RendezVousSpec } from 'src/app/demo/interfaces/rendezVousSpec';
import { CommisionServiceService } from 'src/app/demo/service/commission/commision-service.service';
import { TokenService } from 'src/app/demo/service/token/token.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent implements OnInit{

  totalCommission: Number;
  lesCommissions: Commission;
  rdvSearch : RendezVousSpec= {
    client: '',
    dateRendezVousMin: '',
    dateRendezVousMax: '',
    personnal: '',
    service: '',
    statut: ''
  }
  page:Number;
  perPage: Number;
  totalData: Number;
  rdvMin: Date;
  rdvMax: Date;
  empId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;

  constructor(
    private commissionService: CommisionServiceService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.listeCommission(null,0,10);
  }

  onPageChange(event: PageEvent,commission: NgForm) {
        
    this.listeCommission(commission,event.page,10);
  }

  public listeCommission(commissionSearch:NgForm, pageP: Number,perPageP:Number): void {

    if(pageP === undefined || perPageP === undefined){
      pageP = 0; 
      perPageP = 10;
    } 

    this.commissionService.listeCommission(commissionSearch ? commissionSearch.value : this.rdvSearch,0,10).subscribe(
      (response:CustomResponse) => {

        if(response.status == 200 || response.status == 201) {
          console.log(response.data);
          this.lesCommissions = response.data
          this.totalCommission = response.data.totalCommission;
          this.perPage = 10;
          this.totalData = response.data.nombreRendezVous;
          console.log(this.lesCommissions);
        }
        
      },(error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

}
