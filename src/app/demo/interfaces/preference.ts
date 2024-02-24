import { Service } from "./service";
import { Utilisateur } from "./utilisateur";

export interface Preference {
    id: string;
	client:Utilisateur;
	personnel:Utilisateur[];
    service:Service;
    statut:Boolean;
}
