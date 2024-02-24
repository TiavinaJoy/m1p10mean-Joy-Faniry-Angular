import { Categorie } from "./categorie";

export interface Service {
    _id?: string;
	nom:string;
	prix:Number;
    commission:Number;
    duree:Number;
    statut:Boolean;
    description:string;
    categorie:Categorie;
}
