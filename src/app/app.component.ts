import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loadedFeature:string = 'Recipes';
  // showShoppingList:boolean = !this.showReceipes;

  openSelectedFeature(feature:string){
    switch(feature) {
      case 'Recipes':
        this.loadedFeature = 'Recipes';
        break;
      case 'Shopping-List':
        this.loadedFeature = 'Shopping-List';
    }
  }
}
