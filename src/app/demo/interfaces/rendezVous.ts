import { Service } from "./service";
import { StatutRendezVous } from "./statutRendezVous";
import { Utilisateur } from "./utilisateur";

export enum Color{
    Nouveau = 'blue',
    EnCours = 'yellow',
    Effectué = 'green',
    Reporté =  'grey',
    Annuler = 'red',
}

export interface RendezVous {
    _id?: string,
    client:Utilisateur | string,
    dateRendezVous:Date | string,
    dateFin: Date | string,
    personnel: Utilisateur | string,
    service: Service | string,
    statut: StatutRendezVous | string,
    color?: Color
}
