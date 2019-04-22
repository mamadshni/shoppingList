import { Recipe } from './../recipes/recipe.model';
import { ServerService } from './../services/server.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private serverService: ServerService) {}

  saveData() {
    this.serverService
      .saveRecipes()
      .subscribe((response: Response) => console.log(response));
  }

  getData() {
    this.serverService.getRecipes();
  }
}
