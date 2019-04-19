import { ShoppingListService } from './../services/shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getItems();
    this.ingredientSubscription = this.shoppingListService.changedIngredients.subscribe(
      (items: Ingredient[]) => (this.ingredients = items)
    );
  }
  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }
}
