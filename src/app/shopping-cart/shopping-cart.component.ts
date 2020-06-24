import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from '../products/items.service';
import { Item } from '../products/item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  items: Item[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.itemsService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSum() {
    let sum = 0;
    this.items.forEach((i) => {
      sum += i.getProduct().price + i.getQuantity();
    });
    return sum;
  }
}
