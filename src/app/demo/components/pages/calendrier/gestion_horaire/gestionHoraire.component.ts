import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";

@Component({
    templateUrl: './gestionHoraire.component.html'
})

export class GestionHoraireComponent implements OnInit {

    afficherAjoutModal: boolean = false;
    afficherFicheModal: boolean = false;
    submitted: boolean = false; 
    dateDebut: Date;
    dateFin: Date;
    rdv: any;

    data: [];
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
      
    constructor() { }

    ngOnInit() {
    }

    /*Ouverture du formulaire d'ajout des jours libre */
    modalJourLibre(arg) {
      const today = new Date();
      const clickedDate = arg.date;
      today.setHours(0,0,0,0);
        if( today > clickedDate) {
          this.afficherAjoutModal = false;
        }else {
          this.afficherAjoutModal = true;
        }
      this.dateDebut = arg.date;
      this.dateFin = arg.date;
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

    ajoutLibre() {
      this.afficherAjoutModal = false;
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
} 