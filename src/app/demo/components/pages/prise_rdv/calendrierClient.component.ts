import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { Router } from '@angular/router';
import { Service } from 'src/app/demo/interfaces/service';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './calendrierClient.component.html',
    providers: [MessageService]
})
export class CalendrierClientComponent implements OnInit {
  rdvId: string;
  draggedService: Service;
  services:Service[];
    submitte: Boolean = false;
    selectedCountry!: any;
    countries!: any;
    afficherAjoutModal: boolean = false;
    afficherFicheModal: boolean = false;
    submitted: boolean = false; 
    dateDebut: Date;
    dateFin: Date;
    rdv: any;

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth', 
        plugins: [dayGridPlugin,timeGridPlugin,listPlugin,interaction ],
        locale: 'fr',
        headerToolbar:{
            left:'prev,next today',
            center:'title',
            right:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        editable:true,
        nowIndicator:true,
        buttonText: {
          today: "Aujourd'hui",
          day: 'Jour',
          week:'Semaine',
          month:'Mois',
          list:'Liste'
      },
      dateClick: this.modalJourLibre.bind(this),
      events:  this.listeEvent(),
      eventClick: this.modalFicheJourLibre.bind(this),
      handleWindowResize: true

    }
      
    constructor(
      private router: Router,
      private serviceService: ServiceService,
      private messageService: MessageService
    ) { }

    ngOnInit() {
      this.rdvId = this.router.url.split('/')[3];
      this.lesServices();
        this.countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];
    }

    private lesServices(): Service[] {

      this.serviceService.tousLesServices().subscribe(
          (response:any) => {
            console.log(response.data)
              this.services = response.data;
          },
          (error:HttpErrorResponse) => {
              if(error.status !== 500) {
                  this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
              }else{
                  this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
              }
          }
      );
      return this.services;
  }

    /*DRAG AND DROP */
    dragStart(service: Service) {
      this.draggedService = service;
    }

    dragEnd() {
      this.draggedService = null;
    }
    /*DRAG AND DROP */
    /*Ouverture du formulaire d'ajout des jours libre */
    modalJourLibre(arg) {
      const today = new Date();
      const clickedDate = arg.date;
      today.setHours(0,0,0,0);
        if( today> clickedDate) {
          this.afficherAjoutModal = false;
        }else {
          this.afficherAjoutModal = true;
        }
        this.dateDebut = arg.date;
      }
      
      /*Fermeture du formulaire d'ajout jour libre */
      fermerAjoutModal() {
        this.afficherAjoutModal = false;
        this.submitted = false;
      }
  
      /*Ouverture du formulaire des fiches jours libres */
      modalFicheJourLibre(arg) {
        this.afficherFicheModal = true;
        this.dateDebut = arg.date;
        this.dateFin = arg.date;
      }
  
      /*Fermeture du formulaire des fiches jours libres */
      fermerFicheModal() {
        this.afficherFicheModal = false;
        this.submitted = false;
      }
  
      /*Liste des evenements */
      listeEvent() {
        return this.rdv = [
          { title: 'event 1', date: '2024-02-10 10:00' },
          { title: 'event 2', date: '2024-02-09 10:00' }
        ]
      }
      
      /*Function appel API pour la gestion des horaires: ajout,fiche,modification,annularion */
  
      ajoutLibre() {
        this.afficherAjoutModal = false;
        alert("Ajout libre");
      }
  
      ficheLibre(data) {
        this.afficherFicheModal = false;
      }
  
      modifierLibre(data) {
        alert("Modification du jour libre");
      }
  
      annulerLibre(data) {
        alert("Annulation du jour libre");
      }
      
      nextPage() {
        /*if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
            this.ticketService.ticketInformation.personalInformation = this.personalInformation;
           this.router.navigate(['pages/rdv/calendar']);

            return;
        }*/
        this.router.navigate(['pages/rdv/'+this.rdvId+'/confirmation']);
        this.submitte = true;
    }

    prevPage() {
      this.router.navigate(['pages/rdv/'+this.rdvId+'/personal']);
      //this.router.navigate(['pages/rdv/personal']);
    }
}