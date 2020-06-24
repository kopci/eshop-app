import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewProductDetail() {
    this.router.navigate([`products/${this.product.id}`]);
  }
}
