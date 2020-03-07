import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

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
  collapsed = true;
  constructor(private dsService: DataStorageService) {}
  onSaveRecipes():void{
    this.dsService.storeRecipes();
  }
  onFetchRecipes(){
    this.dsService.fetchRecipes().subscribe();
  }
}
