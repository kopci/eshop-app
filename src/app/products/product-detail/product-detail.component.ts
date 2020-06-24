import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataProviderService } from 'src/app/shared/dataprovider.service';
import { Product } from '../product.model';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  quantity = 1;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private provider: DataProviderService,
    private itemsService: ItemsService
  ) {}

  onAddItem() {
    this.itemsService.addItem(new Item(this.product, this.quantity));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.provider.getProduct(this.id).subscribe((product) => {
        this.product = product;
        console.log(this.product);
      });
    });
  }
}
