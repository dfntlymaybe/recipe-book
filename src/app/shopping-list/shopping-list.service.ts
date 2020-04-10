import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root'})
export class ShoppingListService{

  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  editItem: Subject<number> = new Subject<number>();
  private ingredients: Ingredient[] = [
  new Ingredient('Potatos', 5),
  new Ingredient('Onions', 8)
  ]

  getIngredientByIndex(index: number): Ingredient{
    return this.ingredients[index];
  }
  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }
  addIngredient(newIngredient: Ingredient): void{
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]): void{
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, ingredient: Ingredient): void{
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  removeIngredient(index: number): void{
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  clearList(): void{
    this.ingredients.length = 0;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}