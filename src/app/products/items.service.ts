import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Subject, ObjectUnsubscribedError } from 'rxjs';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  itemsChanged = new Subject<Item[]>();

  addItem(item: Item) {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
  }

  updateQuantity(product: Product, quantity: number) {
    this.items.forEach(
      (i) => i.getProduct() === product && i.setQuantity(quantity)
    );
  }

  productIsInShoppingCart(product: Product) {
    // TODO CHECK
  }

  getItems() {
    return this.items.slice();
  }
}
