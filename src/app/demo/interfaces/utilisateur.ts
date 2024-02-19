import { InfoEmploye } from "./infoEmploye";
import { Role } from "./role";

export interface Utilisateur {
    id: string;
	mail:string;
	mdp:string;
    nom:string;
    prenom:string;
    statut: Boolean;
    role: Role;
    infoEmploye: InfoEmploye;
}
