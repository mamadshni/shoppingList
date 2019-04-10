import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  changedIngredients = new EventEmitter<Ingredient[]>();

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
    this.changedIngredients.emit(this.ingredients.slice());
  }
  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
    this.changedIngredients.emit(this.ingredients.slice());
  }
}
