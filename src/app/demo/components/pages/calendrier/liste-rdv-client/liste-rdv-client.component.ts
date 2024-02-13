import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";

@Component({
  selector: 'app-liste-rdv-client',
  templateUrl: './liste-rdv-client.component.html',
})
export class ListeRdvClientComponent implements OnInit{

  selectedCountry!: any;
  countries!: any;
  afficherAjoutModal: boolean = false;
  afficherFicheModal: boolean = false;
  submitted: boolean = false; 
  dateDebut: Date;
  dateFin: Date;
  rdv: any;

  calendarOptions: CalendarOptions = {
      initialView: 'timeGridWeek', 
      plugins: [dayGridPlugin,timeGridPlugin,listPlugin,interaction ],
      locale: 'fr',
      headerToolbar:{
          center:'title',
          left:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
    events:  this.listeEvent(),
    eventClick: this.modalFicheJourLibre.bind(this),
    handleWindowResize: true
  }
    
  constructor() { }

  ngOnInit() {
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

  /*Ouverture du formulaire des fiches jours libres */
  modalFicheJourLibre(arg) {
    this.afficherFicheModal = true;
    this.dateDebut = arg.date;
    alert(arg);
  }

  /*Fermeture du formulaire des fiches jours libres */
  fermerFicheModal() {
    this.afficherFicheModal = false;
    this.submitted = false;
  }

  /*Liste des evenements */
  listeEvent() {
    return this.rdv = [
      { title: 'event 1', date: '2024-02-13 10:00' },
      { title: 'event 2', date: '2024-02-12 11:00' }
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
