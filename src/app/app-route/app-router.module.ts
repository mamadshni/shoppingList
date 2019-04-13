import { RecipeDetailComponent } from './../recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './../shopping-list/shopping-list.component';
import { RecipesComponent } from './../recipes/recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [{ path: 'detail/:id', component: RecipeDetailComponent }]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: '/recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
