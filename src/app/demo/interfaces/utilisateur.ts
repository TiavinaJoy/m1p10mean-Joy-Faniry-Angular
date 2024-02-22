import { InfoEmploye } from "./infoEmploye";
import { Role } from "./role";

export interface Utilisateur {
    _id: string;
	mail:string;
	mdp:string;
    confirmMdp:String;
    nom:string;
    prenom:string;
    statut: Boolean;
    role: Role;
    infoEmploye: InfoEmploye;
}
