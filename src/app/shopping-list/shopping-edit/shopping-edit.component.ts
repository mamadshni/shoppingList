import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ShoppingItem = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit() {}

  addItem(name: HTMLInputElement, amount: HTMLInputElement) {
    this.ShoppingItem.emit(new Ingredient(name.value, +amount.value));
  }
}
