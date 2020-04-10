import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f', {static: false}) slForm:NgForm;
  editMode:boolean = false;
  edittedItemINdex:number;
  edittedItem: Ingredient;
  subscription: Subscription = new Subscription();
  
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnInit() {
    this.subscription = this.shoppingListService.editItem.subscribe(
      (index: number)=> {
        this.editMode = true;
        this.edittedItemINdex = index;
        this.edittedItem = this.shoppingListService.getIngredientByIndex(index);
        this.slForm.setValue({          
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
    );
  }
  ngAfterViewInit() {
  }
  onSubmit(): void{
    const ingredient = new Ingredient(this.slForm.value.name, this.slForm.value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.edittedItemINdex, ingredient);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }
  onDelete(): void{
    this.shoppingListService.removeIngredient(this.edittedItemINdex);
    this.onClear();
  }
  onClear():void{
    this.editMode = false;
    this.slForm.reset();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
