import { RendezVous } from "./rendezVous";
import { Utilisateur } from "./utilisateur";

export interface Facture {
    _id?: string,
	rendezVous: RendezVous |string,
    client:Utilisateur | string,
    prix: Number
}
