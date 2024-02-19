import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeSpec } from 'src/app/demo/interfaces/employeSpec';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { TokenService } from 'src/app/demo/service/token/token.service';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
    templateUrl: './profil.component.html',
    providers: [MessageService]
})
export class ProfilComponent implements OnInit{
    uploadedFiles: any[] = [];

    employeInfo: Utilisateur = {
        id: '',
        mail: '',
        mdp: '',
        nom: '',
        prenom: '',
        statut: undefined,
        role: undefined,
        infoEmploye: undefined,
        confirmMdp: undefined
    };

    constructor(
        private messageService: MessageService,
        private tokenService:TokenService,
        private utilisateurService: UtilisateurService
    ) {}

    ngOnInit(): void {
        this.detailsEmploye();
    }

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    public detailsEmploye(): Utilisateur {

        this.utilisateurService.detailsEmploye('65d35e5c86034400299419e7').subscribe(
            (response:any) => {
                this.employeInfo = response.data;
                console.log(this.employeInfo);
            },
            (error:HttpErrorResponse) => {
                if(error.status !== 500) {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
                }else{
                    console.log("serveur");
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
                }
            }
        );
        return this.employeInfo;
    }

    public updateProfil(modifierProfil:NgForm) {

        this.employeInfo.mail = modifierProfil ? modifierProfil.value.mail : this.employeInfo.mail;
        this.employeInfo.mdp = modifierProfil ? modifierProfil.value.mdp : this.employeInfo.mdp;
        this.employeInfo.nom = modifierProfil ? modifierProfil.value.nom : this.employeInfo.nom;
        this.employeInfo.prenom = modifierProfil ? modifierProfil.value.prenom : this.employeInfo.prenom;
        this.employeInfo.confirmMdp = modifierProfil ? modifierProfil.value.confirmMdp : '';

        this.utilisateurService.updateEmployeSimple('65d35e5c86034400299419e7',this.employeInfo).subscribe(
            (response:any) => {
                console.log(response);
                modifierProfil.reset();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            },
            (error:HttpErrorResponse) => {
                if(error.status !== 500) {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
                }else{
                    console.log("serveur");
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
                }
            }
        )
    }
}
