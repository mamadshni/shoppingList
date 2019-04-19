import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  shoppingForm: FormGroup;
  ingredientSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.shoppingForm = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    });

    this.ingredientSubscription = this.route.queryParams.subscribe(
      (param: Params) => {
        if (param['edit']) {
          const selectedIngredient = this.shoppingListService.getItem(
            +param['edit']
          );
          this.shoppingForm.setValue({
            ingredientName: selectedIngredient.name,
            ingredientAmount: selectedIngredient.amount
          });
          this.editMode = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onSubmit() {
    const { ingredientName, ingredientAmount } = this.shoppingForm.value;
    const item = new Ingredient(ingredientName, ingredientAmount);
    if (this.route.snapshot.queryParams['edit']) {
      this.shoppingListService.changeItem(
        this.route.snapshot.queryParams['edit'],
        item
      );
      this.router.navigate(['/shopping-list']);
    } else {
      this.shoppingListService.addItem(item);
    }
    this.onClearForm();
  }

  onDeleteItem() {
    this.shoppingListService.deleteItem(
      this.route.snapshot.queryParams['edit']
    );
    this.router.navigate(['/shopping-list']);
    this.onClearForm();
  }

  onClearForm() {
    this.shoppingForm.reset();
    if (this.editMode) {
      this.editMode = false;
      this.router.navigate(['/shopping-list']);
    }
  }
}
