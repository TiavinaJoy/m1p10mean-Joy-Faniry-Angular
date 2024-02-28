import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

    rdvParJour: Number[] = [];

    rdvParMois: Number[] = [];

    tempsMoyenDeTravail: Number[] = [];

    barCaMensuel: any;

    barRdvParJour: any;

    barRdvTempsTravail: any;

    barRdvParMois: any;

    barOptions: any;

    jours:string[] = [];
   
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
        private utilisateurService: UtilisateurService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        
        this.initCharts();
    }

    onPageChange(event: PageEvent,rdvParMoisFilter: NgForm) {
        
        this.rdvPerMonths(rdvParMoisFilter);
    }

    anneeEnCours = new Date().getFullYear();

    listeMois: string[] = Array.from({length: 12}, (_,i) =>  {
        const date = new Date(this.anneeEnCours,i,1);
        return date.toLocaleDateString('fr-FR',{month:'long'})
    })

    
    listeJour(): string[] {
        const daty = new Date();
        for(var i = 0; i<7 ; i++) {
            daty.setDate(i+1);
            this.jours.push(daty.toLocaleDateString('fr-FR',{ weekday :'long'}))
        }
        return this.jours;
    } 

    initCharts() {

        this.listeJour();
        this.caMensuel();
        this.rdvPerDays();
        this.listeEmploye();
        this.avgWorkTime();
        this.rdvPerMonths(null);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.barCaMensuel = {
            labels: this.listeMois,
            datasets: [
                {
                    label: "Chiffre d'affaire",
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data:this.caMensuelData
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
    
    public caMensuel(): void {
        
        this.dashService.caMensuel().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    this.caMensuelData.push(element.totalAmount);
                });
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }

    public rdvPerDays(): void {
        
        this.dashService.rdvParJour().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    this.rdvParJour.push(element.count);
                });
                console.log(this.rdvParJour)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }

    public avgWorkTime(): void {
        
        this.dashService.tempsMoyenTravail().subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    
                    this.tempsMoyenDeTravail.push(element.averageHours);
                });
                console.log(this.tempsMoyenDeTravail)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }

    public rdvPerMonths(rdvPerMonthSearch: NgForm): void {
        
        console.log(rdvPerMonthSearch? rdvPerMonthSearch.value : null);
        
        console.log("filtre")
        this.dashService.rdvParMois(rdvPerMonthSearch ? rdvPerMonthSearch.value : this.rdvSpec).subscribe(
            (response:CustomResponse) => {
                response.data.data.forEach(element => {
                    this.rdvParMois.push(element.count);
                });
                console.log(this.rdvParMois)
            },(error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }
}
