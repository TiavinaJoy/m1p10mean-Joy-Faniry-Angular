import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomResponse } from 'src/app/demo/interfaces/customResponse';
import { Depense } from 'src/app/demo/interfaces/depense';
import { DepenseService } from 'src/app/demo/service/depense/depense.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrl: './depense.component.scss'
})
export class DepenseComponent implements OnInit{

  defaultDate: Date=new Date();
  intituleDepense: string;
  montantDepense: string;
  typeDepense: string;
  types: string[];
  depense: Depense = {
    _id: '',
    intitule: '',
    type: '',
    montant: 0,
    datePaiement: ''
  }

  ngOnInit(): void {
    this.getTypes();
  }

  constructor(
    private depenseService: DepenseService,
    private messageService: MessageService,
    private datePipe:DatePipe
  ){}

  public async getTypes() {
    try{
      this.types = await this.depenseService.listeDepense().toPromise();
      console.log(this.types);
    }catch(error) {
      console.log(error);
    }
  }

  public async addDepense(depenseForm: NgForm): Promise<void> {
    try{
      console.log("befor ",depenseForm.value);
      depenseForm.value.datePaiement = this.datePipe.transform(depenseForm.value.datePaiement,'yyyy-MM-dd HH:mm:ss','GMT+3');
      console.log("BETWEE? ", this.datePipe.transform(depenseForm.value.datePaiement,'yyyy-MM-dd HH:mm:ss','GMT+3'))
      console.log("after ",depenseForm.value)
      const response: CustomResponse = await this.depenseService.addService(depenseForm ? depenseForm.value : this.depense).toPromise();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
    }catch(error) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message, life: 3000 });
    }
  }

}
