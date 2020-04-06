import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';

import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe-resolver.service'

const recipeRoutes = [
  {path: 'recipes',
  component: RecipesComponent, 
  canActivate: [AuthGuardService], 
  children:[
    {path: '', component: SelectRecipeComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id',
      component: RecipeDetailsComponent,
      resolve: [RecipeResolverService]},
    {path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipeResolverService]}
  ]},
]

@NgModule({
  imports:[
    RouterModule.forChild(recipeRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class RecipesRoutingModule{}