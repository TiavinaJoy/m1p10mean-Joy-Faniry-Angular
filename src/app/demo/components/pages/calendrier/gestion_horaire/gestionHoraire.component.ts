import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { TokenService } from 'src/app/demo/service/token/token.service';
import { HorairePersonnelService } from 'src/app/demo/service/horairePersonnel/horaire-personnel.service';
import { HorairePersonnel } from 'src/app/demo/interfaces/horairePersonnel';
import { NgForm } from '@angular/forms';
import { HorairePersonnelSearch } from 'src/app/demo/interfaces/horairePersonnelSearch';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { DatePipe, formatDate } from '@angular/common';

@Component({
    templateUrl: './gestionHoraire.component.html',
    providers: [MessageService,DatePipe]
})

export class GestionHoraireComponent implements OnInit {

    dateDebutError: string;
    dateFinError: string;
    horaireAdd: HorairePersonnel = {
      dateDebut: '',
      dateFin: '',
      personnel: '',
      statut: false
    };
    defaultDate: Date = new Date();
    totalData: Number;
    page:Number;
    perPage:Number;
    horaireSearch: HorairePersonnelSearch = {
      dateDebutMin: '',
      dateDebutMax: '',
      dateFinMin: '',
      dateFinMax: '',
      personnel: ''
    };
    lesHorairesPers: HorairePersonnel[];
    personnelId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
    afficherAjoutModal: boolean = false;
    afficherFicheModal: boolean = false;
    submitted: boolean = false; 
    dateDebut: Date;
    dateFin: Date;
    rdv: any;

    data: [];
    calendarOptions: CalendarOptions = {
        initialView: 'timeGridWeek', 
        plugins: [dayGridPlugin,timeGridPlugin,listPlugin,interaction ],
        locale: 'fr',
        //timeZone: 'GMT',
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
      eventClick: this.modalFicheJourLibre.bind(this),
      handleWindowResize: true
    }
     
    public transformListeHoraire(listeHoraire:HorairePersonnel[]) {
      var horaires = [];
      listeHoraire.forEach(data => {
        horaires.push({ start: data.dateDebut, end: data.dateFin }) 
      })
      return horaires;
      
    }
    constructor(
      private messageService: MessageService,
      private tokenService: TokenService,
      private datePipe: DatePipe,
      private horairePersonnelService: HorairePersonnelService
    ) { }

    ngOnInit() {
      this.listeHorairePersonnel(null,0,10);
    }

    public listeHorairePersonnel(filtreHorairePers: NgForm,pageP: Number,perPageP: Number): HorairePersonnel[] {

      if(pageP === undefined || perPageP === undefined){
        pageP = 0; 
        perPageP = 10;
      } 

      this.horairePersonnelService.listeHorairePersonnel(filtreHorairePers ? filtreHorairePers.value : this.horaireSearch,this.personnelId,pageP, perPageP).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {

            var data = response.data.docs;
            var horaires = [];
            data.forEach(daty => {
              horaires.push({ start: daty.dateDebut, end: daty.dateFin }) 
            })
            this.calendarOptions.events = horaires;
            this.lesHorairesPers = response.data.docs;
            this.totalData = response.data.totalDocs;
            this.perPage = response.data.limit; 
          }
        },
        (error:HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
      return this.lesHorairesPers;
    }

    public addHoraire(horaireEmp: NgForm): void {

      const deb = this.datePipe.transform(horaireEmp ? horaireEmp.value.datyDebut : '','yyyy-MM-dd HH:mm:ss','GMT+3')
      const fin = this.datePipe.transform(horaireEmp ? horaireEmp.value.datyFin : '','yyyy-MM-dd HH:mm:ss','GMT+3')
      this.horaireAdd.personnel= this.personnelId;
      this.horaireAdd.dateDebut = deb;
      this.horaireAdd.dateFin = fin;
      
console.log(this.horaireAdd)
      this.horairePersonnelService.addHorairePersonnel(this.horaireAdd).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200 || response.status == 201) {
            this.afficherAjoutModal = false;
            console.log(response.data);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
          }
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this.horaireAdd.dateFin = horaireEmp.value.datyDebut;
          this.horaireAdd.dateFin = horaireEmp.value.datyDebut;
          if(error.error.message.dateDebut) {
            this.dateDebutError = error.error.message.dateDebut;
          }
          if(error.error.message.dateFin) {
            this.dateFinError = error.error.message.dateFin;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
          }
        }
      )

    }
    
    onPageChange(event: PageEvent,filtreHorairePers: NgForm) {
        
        this.listeHorairePersonnel(filtreHorairePers,event.page,1);
    }
    /*Ouverture du formulaire d'ajout des jours libre */
    modalJourLibre(arg) {
      const today = new Date();
      const clickedDate = arg.date;
      today.setHours(today.getHours(),today.getMinutes(),0,0);
        if( today > clickedDate) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez choisir une date et une heure supérieure à la date et heure du jour', life: 3000 });
          this.afficherAjoutModal = false;
        }else {
          this.afficherAjoutModal = true;
        }
      this.horaireAdd.dateDebut = arg.date;
      this.horaireAdd.dateFin = arg.date;
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
        { title: 'event 1', date: '2024-02-15 10:00' },
        { title: 'event 2', date: '2024-02-16 10:00' }
      ]
    }
    
    /*Function appel API pour la gestion des horaires: ajout,fiche,modification,annularion */


    ficheLibre(data) {
      this.afficherFicheModal = false;
    }

    modifierLibre(data) {
      alert("Modification du jour libre");
    }

    annulerLibre(data) {
      alert("Annulation du jour libre");
    }

} 