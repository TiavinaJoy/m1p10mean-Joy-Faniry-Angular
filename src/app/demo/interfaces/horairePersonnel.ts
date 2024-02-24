import { Utilisateur } from "./utilisateur"

export interface HorairePersonnel {
    _id?:string,
    dateDebut: Date | string,
    dateFin: Date | string,
    personnel: Utilisateur | string,
    statut:boolean
}