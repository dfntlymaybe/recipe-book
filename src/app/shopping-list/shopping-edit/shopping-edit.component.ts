import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true})
  nameInput: ElementRef
  @ViewChild('amountInput', {static: true})
  amountInput: ElementRef

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  addIngredient(){
    const ingName = this.nameInput.nativeElement.value;
    const ingAmonut = this.amountInput.nativeElement.value;
    if(ingName && ingAmonut){
      this.shoppingListService.addIngredient(new Ingredient(ingName, ingAmonut));
    }else{
      //TODO: show error message
    }
    
  }
  clearList():void{
    this.shoppingListService.clearList();
  }
  deleteIngredient(){

  }

}
