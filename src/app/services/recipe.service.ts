import { Recipe } from './../recipes/recipe.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  @Output() selectedItem = new EventEmitter<Recipe>();

  changeRecipes = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ];

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.changeRecipes.next(this.getRecipes());
  }

  editRecipe(index: number, recipe: Recipe): void {
    this.recipes.splice(index, 1, recipe);
    this.changeRecipes.next(this.getRecipes());
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipes.splice(this.getIndexRecipe(recipe), 1);
    this.changeRecipes.next(this.getRecipes());
  }

  restoreRecipes(recipes: Recipe[]) {
    this.recipes.splice(0, this.recipes.length);
    this.recipes.push(...recipes);
    this.changeRecipes.next(this.getRecipes());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipe(i: number): Recipe {
    return this.recipes[i];
  }

  getIndexRecipe(recipe: Recipe): number {
    return this.recipes.indexOf(recipe);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.shoppingListService.addItems(ingredients);
  }
}
