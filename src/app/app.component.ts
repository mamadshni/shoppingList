import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRecipe = true;
  rout(condition: boolean) {
    this.isRecipe = condition;
  }
}
