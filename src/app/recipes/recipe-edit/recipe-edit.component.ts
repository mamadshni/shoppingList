import { Subscription } from 'rxjs';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Ingredient } from './../../shared/ingredient.model';
import { RecipeService } from './../../services/recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;
  recipeForm: FormGroup;
  editMode = false;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      ingredients: new FormArray([])
    });

    this.recipeSubscription = this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.editMode = true;
        const recipe = this.recipeService.getRecipe(+param['id']);
        const recipeIng = <FormArray>this.recipeForm.get('ingredients');

        recipe.ingredients.forEach((ingredient: Ingredient) => {
          const group = new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount)
          });
          recipeIng.push(group);
        });

        this.recipeForm.patchValue({
          name: recipe.name,
          imageUrl: recipe.imagePath,
          description: recipe.description
        });
      }
    });
  }
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  onAddIngredient() {
    const group = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(group);
  }

  onSubmit() {
    const { name, imageUrl, description, ingredients } = this.recipeForm.value;
    const ingredient: Ingredient[] = [];
    ingredients.forEach((item: Ingredient) => {
      ingredient.push(new Ingredient(item.name, item.amount));
    });
    const recipe = new Recipe(name, description, imageUrl, ingredient);
    for (
      let i = (<FormArray>this.recipeForm.get('ingredients')).length;
      i >= 0;
      i--
    ) {
      this.onDeleteIngredient(i);
    }
    this.recipeForm.reset();
    if (this.editMode) {
      const index = +this.route.snapshot.params['id'];
      this.recipeService.editRecipe(index, recipe);
      this.editMode = false;
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  check() {
    console.log(this.recipeForm.get('imageUrl'));
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
