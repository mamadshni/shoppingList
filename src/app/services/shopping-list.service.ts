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

  getItems(): Ingredient[] {
    return this.ingredients.slice();
  }

  getItem(i: number): Ingredient {
    return this.ingredients.slice()[i];
  }

  changeItem(index: number, item: Ingredient): void {
    this.ingredients.splice(index, 1, item);
    this.changedIngredients.next(this.getItems());
  }

  deleteItem(index: number): void {
    this.ingredients.splice(index, 1);
    this.changedIngredients.next(this.getItems());
  }

  addItem(item: Ingredient): void {
    this.ingredients.push(item);
    this.changedIngredients.next(this.getItems());
  }
  addItems(items: Ingredient[]): void {
    this.ingredients.push(...items);
    this.changedIngredients.next(this.getItems());
  }
}
