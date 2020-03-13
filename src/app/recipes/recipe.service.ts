import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root'})
export class RecipeService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService){}
  setRecipes(recipesArray: Recipe[]){
    this.recipes = recipesArray;
    this.recipesChanged.next(this.recipes.slice());
  }
  addrecipe(newrecipe: Recipe):void{
    this.recipes.push(newrecipe);
    this.recipesChanged.next(this.recipes.slice());
   }
   updateRecipe(index: number, recipe: Recipe){
     this.recipes[index] = recipe;
     this.recipesChanged.next(this.recipes.slice());
   }
   deleteRecipe(index: number): void{
     this.recipes.splice(index,1);
     this.recipesChanged.next(this.recipes.slice());
   }
   getRecipes():Recipe[]{
     return this.recipes.slice();
   }
   getRecipeByIndex(index: number):Recipe{
     return this.recipes[index];
   }
   addIngredientToShopingList(recipe: Recipe):void{
     this.shoppingListService.addIngredients(recipe.ingredients);
   }
}
