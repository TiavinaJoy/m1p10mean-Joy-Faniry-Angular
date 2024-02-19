
export interface EmployeSpec {
    id: string;
	mail:string;
	mdp:string;
    nom:string;
    prenom:string;
    statut: Boolean;
    role: string;
    dateEmbauche: Date;
    finContrat:Date;
    salaire: Number;
    service: []
}
