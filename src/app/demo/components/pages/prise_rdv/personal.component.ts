import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';

@Component({
	templateUrl: './personal.component.html',
})


export class PersonalComponent implements OnInit {
    
    submitted: Boolean = false;

    selectedList: SelectItem = { value: '' };
	
	cities: SelectItem[] = [];
	
	countries: any[] = [];
	
	selectedMulti: any[] = [];

    selectedDrop: SelectItem = { value: '' };

	constructor(
        private countryService: CountryService,
        private route: ActivatedRoute,
        private router: Router
    ) { }	

	ngOnInit() {

		this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.cities = [
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];
    }

    nextPage() {
        /*if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
            this.ticketService.ticketInformation.personalInformation = this.personalInformation;
           this.router.navigate(['pages/rdv/calendar']);

            return;
        }*/
        this.router.navigate(['pages/rdv/calendar']);
        this.submitted = true;
    }
}
