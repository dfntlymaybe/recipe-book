import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from "./loading-spinners/loading-spinners.component";
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports:[
    CommonModule
  ],
  declarations:[
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  exports:[
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}