import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import { TokenService } from 'src/app/demo/service/token/token.service';
import { MessageService } from 'primeng/api';
import { RendezVousService } from 'src/app/demo/service/rendezVous/rendez-vous.service';
import { NgForm } from '@angular/forms';
import { RendezVous } from 'src/app/demo/interfaces/rendezVous';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { RendezVousSpec } from 'src/app/demo/interfaces/rendezVousSpec';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { DatePipe } from '@angular/common';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { Service } from 'src/app/demo/interfaces/service';
import { StatutRendezVous } from 'src/app/demo/interfaces/statutRendezVous';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
  selector: 'app-rdv-emp',
  templateUrl: './rdv-emp.component.html',
  providers:[MessageService,DatePipe]
})
export class RdvEmpComponent implements OnInit{
    emp: Utilisateur;
    employes: Utilisateur[];
    statutRdvClicked: string;
    statutRdv:string;
    modalChangeRdvStatus:boolean = false;
    dateRdv: Date;
    fiche:RendezVous = {
      client: '',
      dateRendezVous: '',
      dateFin: '',
      personnel: '',
      service: '',
      statut: ''
    };
    page:Number;
    perPage:Number;
    totalData:Number;
    persoId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
    lesRdv: RendezVous[];
    filtreRdvPerso: RendezVousSpec= {
      client: '',
      personnal: '',
      service: '',
      statut: '',
      dateRendezVousMin: '',
      dateRendezVousMax: ''
    }
    lesStatuts: StatutRendezVous[] = [];
    selectedStatut: StatutRendezVous;

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
      eventClick: this.modalFicheJourLibre.bind(this),
      handleWindowResize: true
    }
      
    constructor(
      private tokenService: TokenService,
      private messageService: MessageService,
      private rdvService: RendezVousService,
      private utilisateurService: UtilisateurService,
      private datePipe: DatePipe
    ) { }

    ngOnInit() {
      this.listeRdvPerso(null,0,10);
      this.listeEmploye();
      this.statutRdv = 'test';
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
    
    changerStatutRdv(fiche: any){
      console.log(fiche);
      this.fiche = fiche;
      this.listeStatutRdv();
      this.modalChangeRdvStatus = true;
    }

    onPageChange(event: PageEvent,filtreRdvClient: NgForm) {
        
      this.listeRdvPerso(filtreRdvClient,event.page,4);
    }
    
    /*Function appel API pour la gestion des horaires: ajout,fiche,modification,annularion */

    public listeRdvPerso(filtreRdvPerso: NgForm,pageP:Number, perPageP: Number):void {

      if(pageP === undefined || perPageP === undefined){
        pageP = 0; 
        perPageP = 10;
      } 
  
      this.rdvService.listeRdvPerso(filtreRdvPerso ? filtreRdvPerso.value : this.filtreRdvPerso,pageP,perPageP,this.persoId).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
  
            var data = response.data.docs;
            var rdv = [];
            data.forEach(daty => {
              //rdv.push({ start: daty.dateRendezVous, end: daty.dateFin, id:daty._id }) 
              rdv.push({
                start:this.datePipe.transform(daty.dateRendezVous,'yyyy-MM-dd HH:mm:ss','GMT'),
                end:this.datePipe.transform(daty.dateFin,'yyyy-MM-dd HH:mm:ss','GMT'),
                id:daty._id,
                color: this.rdvService.setRdvColor(daty.statut.intitule)
              })
            })
            console.log(data);
            this.calendarOptions.events = rdv;
            this.lesRdv = data;
            this.totalData = response.data.totalDocs;
            this.perPage = response.data.limit;
            /*this.lesHorairesPers = response.data.docs;
             */
          }
        },
        (error:HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
      //return this.lesRdv;
    }
    
    public ficheRdv(rendezVousId: string): void {

      this.rdvService.detailsRdv(rendezVousId).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
            console.log(response.data);
            this.fiche = response.data;

            this.statutRdvClicked =  response.data.statut.intitule;

            this.dateRdv = new Date(this.datePipe.transform(response.data.dateRendezVous,'yyyy-MM-dd HH:mm:ss','GMT'));
          }
        },
        (error:HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
      //return this.fiche;
    }

    public listeStatutRdv(): void {
      this.rdvService.listeStatutRdv().subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
            const annulerStat = this.fiche.statut;
            response.data.forEach(statut => {
              if(this.statutRdvClicked === 'Nouveau') {
                this.lesStatuts = response.data.filter(statut => (statut.intitule != "Nouveau" && statut.intitule != "Reporté") )
              }else if(this.statutRdvClicked === 'Reporté') {
                this.lesStatuts = response.data.filter(statut => (statut.intitule == "Effectué" || statut.intitule == "Annuler") )
              }
              //this.lesStatuts = response.data;
              return this.lesStatuts;
            })
          }
        },
        (error:HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )
      //return this.lesStatuts;

    }

    public modifierStatut(fiche:RendezVous): void {
      console.log(fiche)
      this.rdvService.annulationRdv(fiche._id,this.statutRdv).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
            console.log(response.data)
            this.modalChangeRdvStatus = false;
            this.afficherFicheModal = false;
            this.submitted = false;
            this.listeRdvPerso(null,0,10);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
          }
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )

    }

    public listeEmploye(): void {

      this.utilisateurService.listeEmploye().subscribe(
          (response:CustomResponse) => {
              this.employes = response.data;
          },
          (error:HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
          }
      );
      //return this.employes;
  }

    ficheLibre(data) {
      this.afficherFicheModal = false;
    }

    public modifierRdv(rdv: RendezVous) {
      console.log(rdv)
      const data = {
        personnelId: this.emp,
        dateRendezVous: this.datePipe.transform(this.dateRdv,'yyyy-MM-dd HH:mm:ss','GMT')
      }
      console.log(data)
      this.rdvService.updateRdv(rdv,data).subscribe(
        (response:CustomResponse) => {
          if(response.status == 200) {
            console.log(response.data)
            this.listeRdvPerso(null,0,10);
            this.afficherFicheModal = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
          }
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
        }
      )

    }

    annulerLibre(data) {
      alert("Annulation du jour libre");
    }
}
