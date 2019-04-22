import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  saveRecipes() {
    return this.http.put(
      'https://ng-recipe-b52b0.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    return this.http
      .get('https://ng-recipe-b52b0.firebaseio.com/recipes.json')
      .pipe(
        map((response: Response) => {
          const recipes = response.json();
          recipes.map((recipe: Recipe) => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          });

          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) =>
        this.recipeService.restoreRecipes(recipes)
      );
  }
}
