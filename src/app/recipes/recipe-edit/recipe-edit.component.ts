import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

import { RecipeService } from '../recipe.service';
// import { Recipe } from '../recipe.model';
// import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (urlParams: Params)=>{
        this.id = +urlParams['id'];
        this.editMode = urlParams['id'] != null;
        this.initForm();
      })
  }
  initForm(): void{
    let recipeName = "";
    let recipeDescription = "";
    let recipeImagePath = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      let recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if(recipe.ingredients){
        for(let ingrident of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingrident.name, Validators.required),
            amount: new FormControl(ingrident.amount, [
              Validators.required, 
              Validators.pattern(/^[1-9]\d*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    })
  }
  // get controls() { // a getter!
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }
  onAddIngredient(): void{
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
              Validators.required, 
              Validators.pattern(/^[1-9]\d*$/)])
    }))
  }
  onDeleteIngredient(index:number):void{
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel():void{
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
  onSubmit(): void{
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addrecipe(this.recipeForm.value);
    }
    this.onCancel()
  }
}
