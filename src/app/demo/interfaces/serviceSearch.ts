import { Categorie } from "./categorie";

export interface ServiceSearch {
    id: string;
	nom:string;
	prixMax:Number;
    prixMin:Number;
    comMin:Number;
    comMax:Number;
    dureeMin:Number;
    dureeMax:Number;
    statut:Number;
    description:string;
    categorie:string;
    isSpecial?:string;
    oldPrice?:string;
    debutOffre?:string;
    finOffre?:string
}
