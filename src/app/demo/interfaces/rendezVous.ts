import { Service } from "./service";
import { StatutRendezVous } from "./statutRendezVous";
import { Utilisateur } from "./utilisateur";

export interface RendezVous {
    _id?: string,
    client:Utilisateur | string,
    dateRendezVous:Date | string,
    dateFin: Date | string,
    personnal: Utilisateur | string,
    service: Service | string,
    statut: StatutRendezVous | string
}
