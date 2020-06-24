import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataProviderService } from '../shared/dataprovider.service';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(
    private provider: DataProviderService,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productsService.getProducts();
    this.provider.fetchProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
