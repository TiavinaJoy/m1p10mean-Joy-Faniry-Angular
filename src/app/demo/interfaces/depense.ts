
export enum TypeDepense{
    passager = 'Achat pièce',
    autre = 'Autre dépense',
    chronique = 'Loyer'
}

export interface Depense {
    _id: string,
    intitule:string,
    type: TypeDepense | string,
    montant: number,
    datePaiement: Date |string
}
