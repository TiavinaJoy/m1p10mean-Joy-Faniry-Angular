import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { EmployeSpec } from 'src/app/demo/interfaces/employeSpec';
import { Utilisateur } from 'src/app/demo/interfaces/utilisateur';
import { TokenService } from 'src/app/demo/service/token/token.service';
import { UtilisateurService } from 'src/app/demo/service/utilisateur/utilisateur.service';

@Component({
    templateUrl: './profil.component.html',
    providers: [MessageService]
})
export class ProfilComponent implements OnInit{
    employeId: string = this.tokenService.decodeToken(localStorage.getItem("token")).sub;
    uploadedFiles: any[] = [];

    employeInfo: Utilisateur = {
        _id: '',
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
        this.detailsEmploye(this.employeId);
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

    public detailsEmploye(empId:string): Utilisateur {

        this.utilisateurService.detailsEmploye(empId).subscribe(
            (response:CustomResponse) => {
                this.employeInfo = response.data;
                console.log(this.employeInfo);
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        );
        return this.employeInfo;
    }

    public updateProfil(modifierProfil:NgForm) {

        this.employeInfo.mail = modifierProfil ? modifierProfil.value.mail : this.employeInfo.mail;
        this.employeInfo.mdp = modifierProfil ? modifierProfil.value.mdp : this.employeInfo.mdp;
        this.employeInfo.nom = modifierProfil ? modifierProfil.value.nom : this.employeInfo.nom;
        this.employeInfo.prenom = modifierProfil ? modifierProfil.value.prenom : this.employeInfo.prenom;
        this.employeInfo.infoEmploye.salaire = this.employeInfo.infoEmploye.salaire;
        this.employeInfo.confirmMdp = modifierProfil ? modifierProfil.value.confirmMdp : '';

        this.utilisateurService.updateEmployeSimple(this.employeId,this.employeInfo).subscribe(
            (response:CustomResponse) => {
                console.log(response);
                modifierProfil.reset();
                this.detailsEmploye(this.employeId);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
            },
            (error:HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
            }
        )
    }
}
