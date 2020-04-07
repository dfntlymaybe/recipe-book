import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module'; 
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from "./auth/auth.component";
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeModule,
    RecipesRoutingModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
