import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";

@Component({
  selector: 'app-recipes-home-page',
  templateUrl: './recipes-home-page.component.html',
  styleUrls: ['./recipes-home-page.component.css']
})
export class RecipesHomePageComponent implements OnInit {

  public recipes: Recipe[] = [];

  constructor(
    private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
  }

}
