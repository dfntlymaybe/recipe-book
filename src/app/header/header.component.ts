import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles:[
    `a{
        cursor: pointer;
      }`
   ]
})

export class HeaderComponent {
  // @Output() featureSelected: EventEmitter<string> = new EventEmitter(); 
  // @Output() shoppingListClickedEvent: EventEmitter<any> = new EventEmitter(); 
  collapsed = true;

  // onSelectFeature(feature: string){
  //   this.featureSelected.emit(feature);
  // }
}