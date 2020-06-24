import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.model';
import { environment } from '../../environments/environment';
import { Item } from '../products/item.model';

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

  sendOrder(totalAmount: number, orderedItems: Item[], date: Date) {
    // remapping is not necessary, i tried to fix previous issue with it..
    let remappedItems = [];
    orderedItems.forEach((item) => {
      remappedItems.push({
        productId: item.getProduct().id,
        quantity: item.getQuantity(),
      });
    });
    console.log(remappedItems);
    return this.http.post(
      `${environment.API_URL}/orders/create`,
      {
        totalPrice: totalAmount,
        items: remappedItems,
        ordered: date,
      },
      { observe: 'response' }
    );
  }
}
