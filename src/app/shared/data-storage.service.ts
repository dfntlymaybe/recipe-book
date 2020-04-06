import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private fbBaseUrl = "https://recipe-book-9d07b.firebaseio.com";
  private fbrecipesUrl = this.fbBaseUrl + "/recipes.json";
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService){
  }
  storeRecipes():void{
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      this.fbrecipesUrl, 
      recipes
    ).subscribe(res => console.log(res))
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>(this.fbrecipesUrl)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
