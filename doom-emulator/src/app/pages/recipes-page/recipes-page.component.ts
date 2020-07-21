import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  constructor(
    private recipesService: RecipesService) { }

  ngOnInit(): void {

    if (this.recipesService.recipes.length == 0){
      console.log("a");
      this.recipesService.getRecipes()
        .subscribe((recipes: any) => {
          // console.log(recipes);
        },
        error => {
          console.log("Recepes didn't download");
        });
    }
  }

}
