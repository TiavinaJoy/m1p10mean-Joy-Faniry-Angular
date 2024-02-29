import { Categorie } from "./categorie";

export interface OffreSpéciale {
    _id?: string;
	nom:string;
	prix:Number;
    commission:Number;
    duree:Number;
    statut:Boolean;
    description:string;
    categorie:Categorie;
    isSpecial?:boolean;
    oldPrice?:Number;
    debutOffre?:Date | string;
    finOffre?:Date | string
}
