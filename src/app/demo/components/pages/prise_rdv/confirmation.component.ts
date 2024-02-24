import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {

  submitted: Boolean = false;

  constructor(private router: Router) { }

  nextPage() {
    /*if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
        this.ticketService.ticketInformation.personalInformation = this.personalInformation;
       this.router.navigate(['pages/rdv/calendar']);

        return;
    }*/
    this.router.navigate(['pages/rdv/payment']);
    this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['pages/rdv/calendar']);
  }
}
