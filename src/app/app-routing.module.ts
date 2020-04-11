import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes:Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)},
  { //lazy loading syntax #1(same as the above)
    path: 'recipes', 
    loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule) 
  },//lazy loading syntax #2
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
