import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root'})
export class ShoppingListService{
  ingredientsChanged:Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
  new Ingredient('Potatos', 5),
  new Ingredient('Onions', 8)
  ]

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }
  addIngredient(newIngredient: Ingredient): void{
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]):void{
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  removeIngredient(index: number): void{
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  clearList():void{
    this.ingredients.length = 0;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}