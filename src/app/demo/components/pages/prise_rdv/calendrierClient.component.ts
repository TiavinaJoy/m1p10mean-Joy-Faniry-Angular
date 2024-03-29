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
import { DatePipe } from '@angular/common';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';

@Component({
    templateUrl: './calendrierClient.component.html',
    providers: [MessageService,DatePipe]
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
    dateRdv:Date;
    dateFin: Date;
    rdv: any;

      
    constructor(
      private router: Router,
      private serviceService: ServiceService,
      private messageService: MessageService,
      private datePipe: DatePipe,
      private rdvService: RendezVousService,
    ) { }

    calendarOptions: CalendarOptions = {
      initialView: 'timeGridWeek', 
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
      eventDrop:(info) => {
        localStorage.setItem('dateRendezVous',this.datePipe.transform(info.event.start,'yyyy-MM-dd HH:mm:ss','GMT'))        
      },
      dateClick: this.modalJourLibre.bind(this),
      eventClick: this.modalFicheJourLibre.bind(this),
      handleWindowResize: true

    }

    ngOnInit() {
      this.rdvId = this.router.url.split('/')[3];
      if(localStorage.getItem("dateRendezVous") != null) {
        this.calendarOptions.events = [ {start: localStorage.getItem("dateRendezVous") } ];
      }
      this.lesServices();
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
    /*Ouverture du formulaire d'ajout des jours libre */
    modalJourLibre(arg) {
      const today = new Date();
      const clickedDate = arg.date;
      today.setHours(today.getHours(),today.getMinutes(),0,0);
        if( today> clickedDate) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez choisir une date et une heure supérieure à la date et heure du jour', life: 3000 });
          this.afficherAjoutModal = false;
        }else {
          this.afficherAjoutModal = true;
        }
        this.dateRdv = arg.date;
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
  
      
      /*Function appel API pour la gestion des horaires: ajout,fiche,modification,annularion */
  
      ajoutLibre() {
        this.afficherAjoutModal = false;
        const date = this.datePipe.transform(this.dateRdv,'yyyy-MM-dd HH:mm:ss','GMT');
        localStorage.setItem('dateRendezVous',date);
        this.calendarOptions.events = [{ start: date }];
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
    }
}