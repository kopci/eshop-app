import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) {}

  fetchProducts() {
    return this.http
      .get<Product[]>(`${environment.API_URL}/getAll`)
      .subscribe((products) => {
        this.productsService.setProducts(products);
        console.log(products);
      });
  }

  findBySubstring(substring: string) {
    return this.http
      .get<Product[]>(`${environment.API_URL}/contains?substring=${substring}`)
      .subscribe((products) => {
        this.productsService.setProducts(products);
      });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.API_URL}/get?id=${id}`);
  }
}
