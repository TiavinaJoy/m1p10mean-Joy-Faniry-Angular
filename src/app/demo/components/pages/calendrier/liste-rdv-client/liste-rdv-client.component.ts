import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { RendezVous } from 'src/app/demo/interfaces/rendezVous';
import { MessageService } from 'primeng/api';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { TokenService } from 'src/app/demo/service/token/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { RendezVousSpec } from 'src/app/demo/interfaces/rendezVousSpec';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-liste-rdv-client',
  templateUrl: './liste-rdv-client.component.html',
  providers:[MessageService,DatePipe]
})
export class ListeRdvClientComponent implements OnInit{
  dateRdv: Date;
  fiche:RendezVous = {
    client: '',
    dateRendezVous: '',
    dateFin: '',
    personnel: '',
    service: '',
    statut: ''
  };
  filtreRdvClient: RendezVousSpec={
    client: '',
    dateMin: '',
    dateMax: '',
    personnal: '',
    service: '',
    statut: ''
  }
  page:Number;
  perPage:Number;
  totalData:Number;
  clientId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
  lesRdv: RendezVous[];
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
    eventClick: this.modalFicheJourLibre.bind(this),
    handleWindowResize: true
  }
    
  constructor(
    private messageService:MessageService,
    private rdvService: RendezVousService,
    private tokenService: TokenService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.listeRdvClient(null,0, 10);
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
    this.ficheRdv(arg.event.id);
    this.afficherFicheModal = true;
  }

  /*Fermeture du formulaire des fiches jours libres */
  fermerFicheModal() {
    this.afficherFicheModal = false;
    this.submitted = false;
  }

  
  onPageChange(event: PageEvent,filtreRdvClient: NgForm) {
        
    this.listeRdvClient(filtreRdvClient,event.page,4);
}
  /*Function appel API pour la gestion des horaires: ajout,fiche,modification,annularion */

  public listeRdvClient(filtreRdvClient: NgForm,pageP:Number, perPageP: Number): RendezVous[] {

    if(pageP === undefined || perPageP === undefined){
      pageP = 0; 
      perPageP = 10;
    } 

    this.rdvService.listeRdvClient(filtreRdvClient ? filtreRdvClient.value : this.filtreRdvClient,0,10,this.clientId).subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {

          var data = response.data;
          var rdv = [];
          data.forEach(daty => {
            rdv.push({ start: daty.dateRendezVous, end: daty.dateFin, id:daty._id }) 
          })
          this.calendarOptions.events = rdv;
          this.lesRdv = data;
          /*this.lesHorairesPers = response.data.docs;
          this.totalData = response.data.totalDocs;
          this.perPage = response.data.limit; */
        }
      },
      (error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
    return this.lesRdv;
  }

  public ficheRdv(rendezVousId: string): RendezVous {

    this.rdvService.detailsRdv(rendezVousId).subscribe(
      (response:CustomResponse) => {
        if(response.status == 200) {
          console.log(response.data);
          this.fiche = response.data;
          this.dateRdv = new Date(this.datePipe.transform(response.data.dateRendezVous,'yyyy-MM-dd HH:mm:ss','GMT'));
        }
      },
      (error:HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
      }
    )
    return this.fiche;
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
