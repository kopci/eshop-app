import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataProviderService } from '../shared/dataprovider.service';
import { ItemsService } from '../products/items.service';
import { Subscription } from 'rxjs';
import { Item } from '../products/item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  itemsInCart = 0;

  constructor(
    private provider: DataProviderService,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  onSearch(e) {
    this.provider.findBySubstring(e.target.value);
  }

  onReset() {
    this.provider.fetchProducts();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.subscription = this.itemsService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.itemsInCart = items.length;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
