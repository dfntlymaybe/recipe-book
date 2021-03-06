import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
       
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[] = []
  igChangedSub: Subscription; 

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      ingredients => {
        this.ingredients = this.shoppingListService.getIngredients()
      }
    )
  }
  oneditIngredient(id: number):void{
    this.shoppingListService.editItem.next(id);
  }
  ngOnDestroy():void{
    this.igChangedSub.unsubscribe();
  }
}
