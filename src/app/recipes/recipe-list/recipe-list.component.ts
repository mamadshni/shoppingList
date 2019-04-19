import { Subscription } from 'rxjs';
import { RecipeService } from './../../services/recipe.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.changeRecipes.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
