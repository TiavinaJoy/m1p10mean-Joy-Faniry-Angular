import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit{

  rdvId:string;
  submitted: Boolean = false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    
    this.rdvId = this.router.url.split('/')[3];
  }

  nextPage() {
    /*if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
        this.ticketService.ticketInformation.personalInformation = this.personalInformation;
       this.router.navigate(['pages/rdv/calendar']);

        return;
    }*/
    
    this.router.navigate(['pages/rdv/'+this.rdvId+'/payment']);
    //this.router.navigate(['pages/rdv/payment']);
    this.submitted = true;
  }

  prevPage() {
    
    this.router.navigate(['pages/rdv/'+this.rdvId+'/calendar']);
    //this.router.navigate(['pages/rdv/calendar']);
  }
}
