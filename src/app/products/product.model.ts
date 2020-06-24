import { identifierModuleUrl } from '@angular/compiler';

export class Product {
  public id: string;
  public name: string;
  public animalCategory: string;
  public price: number;
  public description: string;

  constructor(
    id: string,
    name: string,
    animalCategory: string,
    price: number,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.animalCategory = animalCategory;
    this.price = price;
    this.description = description;
  }
}
