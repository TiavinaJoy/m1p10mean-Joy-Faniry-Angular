import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/demo/service/product.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { Product } from 'src/app/demo/interfaces/product';

@Component({
    templateUrl: './vitrine.component.html'
})
export class VitrineComponent implements OnInit {

    products!: Product[];

    images!: any[];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private productService: ProductService, private photoService: PhotoService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(products => {
            this.products = products;
        });

        this.photoService.getImages().then(images => {
            this.images = images;
        });
    }
    
}