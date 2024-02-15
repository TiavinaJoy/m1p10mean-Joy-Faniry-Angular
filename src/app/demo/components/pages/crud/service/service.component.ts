import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/interfaces/product';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { ServiceService } from 'src/app/demo/service/service/service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Service } from 'src/app/demo/interfaces/service';
import { PageEvent } from 'src/app/demo/interfaces/pageEvent';
import { CategorieService } from 'src/app/demo/service/categorie/categorie.service';
import { Categorie } from 'src/app/demo/interfaces/categorie';
import { FormBuilder, Validators  } from '@angular/forms';

@Component({
    templateUrl: './service.component.html',
    providers: [MessageService],
    styleUrl:'./service.component.scss'
})
export class ServiceComponent implements OnInit {
    /*Mes variables */
    first:Number;

    rows:Number;

    totalData:Number = 120;

    services: Service[]= [];

    service: Service;

    categories: Categorie[] = [];

    selectedCategorie: Categorie | undefined;

    deleteServiceDialog: boolean = false;

    serviceDialog: boolean = false;
    /* */

    
    

    


    products: Product[] = [];

    product: Product = {};

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    serviceForm = this.fb.group({
        nom: ['', [Validators.required]],
        description: ['', [Validators.required]],
        prix: ['', [Validators.required,Validators.min(1)]],
        commission: ['', [Validators.required]],
        duree: ['', [Validators.required]],
        categorie: ['', [Validators.required]]
    })

    constructor(
        private productService: ProductService, 
        private messageService: MessageService,
        private serviceService: ServiceService,
        private categorieService: CategorieService,
        private fb:FormBuilder,
        private route: Router
    ) { }

    ngOnInit() {
        this.listeService(0);
        this.listeCategorie();

        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.serviceDialog = true;
    }


    editProduct(product: Product) {
        this.product = { ...product };
        this.serviceDialog = true;
    }

    deleteService(service) {
        this.deleteServiceDialog = true;
        this.service = service;
    }

    confirmDelete(service) {
        this.deleteServiceDialog = false;
        this.updateStatutService(service._id);
    }

    hideDialog() {
        this.serviceDialog = false;
        this.submitted = false;
    }

    saveService() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.serviceDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    listeService(page:Number): void{
        this.serviceService.listeServices(page).subscribe(
          
          (response:any) =>{
            
            if(response.status === 200) {
                this.services = response.data.docs;
            }
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
          }
        )
    }

    listeCategorie(): void{
        this.categorieService.listeCategorie().subscribe(
          
            (response:any) =>{
              
              if(response.status === 200) {
                  this.categories = response.data;
              }
            },
            (error: HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
          )
    }

    updateStatutService(id:string): void{
        this.serviceService.updateStatutService(id).subscribe(
          
            (response:any) =>{
              
              if(response.status === 200) {
                  this.service = response.data;
                  console.log(response);
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
              }
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message, life: 3000 });
            }
          )
    }


    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
