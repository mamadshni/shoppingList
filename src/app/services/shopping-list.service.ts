import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  changedIngredients = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getItems() {
    return this.ingredients.slice();
  }

  addItem(item: Ingredient) {
    this.ingredients.push(item);
    this.changedIngredients.next(this.ingredients.slice());
  }
  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
    this.changedIngredients.next(this.ingredients.slice());
  }
}
