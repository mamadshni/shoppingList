import { RecipeService } from './../services/recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.selectedItem.subscribe(
      (item: Recipe) => (this.selectedRecipe = item)
    );
  }
}
