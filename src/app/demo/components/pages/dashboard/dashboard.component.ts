import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription, debounceTime, take } from 'rxjs';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { RendezVousSpec } from 'src/app/demo/interfaces/rendezVousSpec';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { DashboardService } from 'src/app/demo/service/dashboard/dashboard.service';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    dateMin: Date;

    dateMax: Date;

    perPage: Number;

    page:Number;

    totalData:Number;

    employes: string[] = [];

    items!: MenuItem[];

    caMensuelData: Number[] = [];

    caJournalierData: Number[] = [];

    beneficeData: Number[] = [];

    rdvParJour: Number[] = [];

    rdvParMois: Number[] = [];

    tempsMoyenDeTravail: Number[] = [];

    barCaMensuel: any;

    barCaJournalier:any;

    barRdvParJour: any;

    barRdvTempsTravail: any;

    barRdvParMois: any;

    barBenefice: any;

    barOptions: any;

    jours:string[] = [];

    anneeEnCours = new Date().getFullYear();

    listeMois: string[] = [];

    listeMoisCA: string[] = [];

    listeJourCA: string[] = [];

    listeMoisBenefice: string[] = [];

    personnel:string[] = [];

    rdvSpec: RendezVousSpec = {
        client: '',
        dateRendezVousMin: '',
        dateRendezVousMax: '',
        personnal: '',
        service: '',
        statut: ''
    }

    subscription: Subscription;
    constructor(
        private layoutService: LayoutService,
        private dashService: DashboardService,
        private messageService: MessageService,
        private utilisateurService: UtilisateurService,
        private datePipe:DatePipe
    ) {
        /*this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });*/
    }

    ngOnInit() {
        this.initCharts();
    }

    onPageChange(event: PageEvent,rdvParMoisFilter: NgForm) {
        
        this.rdvPerMonths(rdvParMoisFilter);
    }

    

    /*listeMois: string[] = Array.from({length: 12}, (_,i) =>  {
        const date = new Date(this.anneeEnCours,i,1);
        return date.toLocaleDateString('fr-FR',{month:'long'})
    })*/

    
    /*listeJour(): string[] {
        const daty = new Date();
        for(var i = 0; i<7 ; i++) {
            daty.setDate(i+1);
            this.jours.push(daty.toLocaleDateString('fr-FR',{ weekday :'long'}))
        }
        return this.jours;
    } */

    async initCharts() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        await this.caMensuel();
        await this.caJournalier();
        await this.rdvPerDays();
        await this.listeEmploye();
        await this.avgWorkTime();
        await this.rdvPerMonths(null);
        await this.benefice();

        this.barBenefice = {
            labels: this.listeMoisBenefice,
            datasets: [
                {
                    label: "Bénéfice mensuel",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.beneficeData
                }
            ]
        };

        this.barCaMensuel = {
            labels: this.listeMoisCA,
            datasets: [
                {
                    label: "Chiffre d'affaire mensuel",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.caMensuelData
                }
            ]
        };

        this.barCaJournalier = {
            labels: this.listeJourCA,
            datasets: [
                {
                    label: "Chiffre d'affaire journalier",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.caJournalierData
                }
            ]
        };

        
        this.barRdvParJour = {
            labels: this.jours,
            datasets: [
                {
                    label: "Rendez-vous par jour",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.rdvParJour
                }
            ]
        }; 

        this.barRdvTempsTravail = {
            labels: this.employes,
            datasets: [
                {
                    label: "Temps moyen de travail",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.tempsMoyenDeTravail
                }
            ]
        }; 

        this.barRdvParMois = {
            labels: this.listeMois,
            datasets: [
                {
                    label: "Rendez-vous par mois",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.rdvParMois
                }
            ]
        };

        this.barOptions = {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    private listeEmploye(): void {

        this.utilisateurService.listeEmploye().subscribe(
            (response:CustomResponse) => {
                response.data.forEach(emp => {
                    this.employes.push(emp.nom)
                })
                console.log(this.employes)
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
    }
    
    /*public caMensuel(): void {
        
        this.dashService.caMensuel().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    var dateLabel = new Date();
                    dateLabel.setMonth(element._id.month-1)
                    this.listeMoisCA.push(dateLabel.toLocaleString('fr-FR',{month:'long'}));
                    this.caMensuelData.push(element.totalAmount);
                });
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }*/

    public async caMensuel() {
        try{
            const response = await this.dashService.caMensuel().toPromise();
            response.data.data.forEach(element => {
                var dateLabel = new Date();
                dateLabel.setMonth(element._id.month-1)
                this.listeMoisCA.push(dateLabel.toLocaleString('fr-FR',{month:'long'}));
                this.caMensuelData.push(element.totalAmount);
            });
        }catch(error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
    }

    public async caJournalier() {
        try{
            const response = await this.dashService.caJournalier().toPromise();
            response.data.data.forEach(element => {
                console.log(element);
                var dateLabel = new Date(element._id.year,element._id.month-1,element._id.day);
                var setDateLabel = this.datePipe.transform(dateLabel,'yyyy-MM-dd','GMT');
                this.listeJourCA.push(setDateLabel);
                this.caJournalierData.push(element.totalAmount);
            });
        }catch(error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
    }

    /*public rdvPerDays(): void {
        
        this.dashService.rdvParJour().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    var dateLabel = new Date(element._id.year,element._id.month-1,element._id.day);
                    var setDateLabel = this.datePipe.transform(dateLabel,'yyyy-MM-dd','GMT');
                    this.jours.push(setDateLabel)
                    this.rdvParJour.push(element.count);
                });
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }*/

    public async rdvPerDays(){
        try{
            const response = await this.dashService.rdvParJour().toPromise();
            response.data.data.forEach(element => {
                var dateLabel = new Date(element._id.year,element._id.month-1,element._id.day);
                var setDateLabel = this.datePipe.transform(dateLabel,'yyyy-MM-dd','GMT');
                this.jours.push(setDateLabel)
                this.rdvParJour.push(element.count);
            });
        }catch(error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
        /*this.dashService.rdvParJour().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    var dateLabel = new Date(element._id.year,element._id.month-1,element._id.day);
                    var setDateLabel = this.datePipe.transform(dateLabel,'yyyy-MM-dd','GMT');
                    this.jours.push(setDateLabel)
                    this.rdvParJour.push(element.count);
                });
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )*/
    }

    /*public avgWorkTime(): void {
        
        this.dashService.tempsMoyenTravail().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    console.log(element)
                    this.tempsMoyenDeTravail.push(element.averageHours);
                });
                console.log(this.tempsMoyenDeTravail)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }*/

    public async avgWorkTime() {
        
        try{
            const response = await this.dashService.tempsMoyenTravail().toPromise();
            response.data.data.forEach(element => {
                this.tempsMoyenDeTravail.push(element.averageHours);
            });
        }catch(error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
        /*this.dashService.tempsMoyenTravail().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    console.log(element)
                    this.tempsMoyenDeTravail.push(element.averageHours);
                });
                console.log(this.tempsMoyenDeTravail)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )*/
    }
    /*public rdvPerMonths(rdvPerMonthSearch: NgForm): void {
        
        this.dashService.rdvParMois(rdvPerMonthSearch ? rdvPerMonthSearch.value : this.rdvSpec).subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    var dateLabel = new Date(element._id.year,element._id.month-1);
                    this.listeMois.push(dateLabel.toLocaleString('fr-FR',{month:'long'}));
                    this.rdvParMois.push(element.count);
                });
                console.log(this.rdvParMois)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }*/

    public async rdvPerMonths(rdvPerMonthSearch: NgForm) {
        try {
            const response: CustomResponse = await this.dashService.rdvParMois(rdvPerMonthSearch ? rdvPerMonthSearch.value : this.rdvSpec).toPromise();

            response.data.data.forEach(element => {
                var dateLabel = new Date(element._id.year,element._id.month-1);
                this.listeMois.push(dateLabel.toLocaleString('fr-FR',{month:'long'}));
                this.rdvParMois.push(element.count);
            });

        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
    }

    public async benefice() {
        try {
            const response: CustomResponse = await this.dashService.benefice().toPromise();
            console.log(response.data)
            response.data.forEach(element => {
                var dateLabel = new Date(element.year,element.month-1);
                this.listeMoisBenefice.push(dateLabel.toLocaleString('fr-FR',{month:'long'}));
                this.beneficeData.push(element.profit);
                console.log(element);
            });

        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error, life: 3000 });
        }
    }ic 
}
