import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from '../products/items.service';
import { Item } from '../products/item.model';
import { DataProviderService } from '../shared/dataprovider.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: Item[] = [];
  successfullySent = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private provider: DataProviderService
  ) {}

  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }

  getSum() {
    let sum = 0;
    this.items.forEach((i) => {
      sum += i.getProduct().price * i.getQuantity();
    });
    return sum;
  }

  onSubmitOrder() {
    this.provider
      .sendOrder(this.getSum(), this.items, new Date())
      .subscribe((response) => {
        if (response.status === 200) {
          this.successfullySent = true;
        }
      });
  }
}
