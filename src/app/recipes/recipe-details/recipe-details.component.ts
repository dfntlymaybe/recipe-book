import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})

export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}
  ngOnInit() {
    this.activatedRoute.params.subscribe((urlParams: Params) => {
        this.id = +urlParams['id'];
        // console.log('id: ' + id)
        this.recipe = this.recipeService.getRecipeByIndex(this.id);
    })
  }

  onAddtoShoppingList():void {
    this.recipeService.addIngredientToShopingList(this.recipe);
  }

  onEdit():void{
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
}
  