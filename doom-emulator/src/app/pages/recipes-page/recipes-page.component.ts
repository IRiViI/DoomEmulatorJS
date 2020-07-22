import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {

  public loaded = false;

  constructor(
    private recipesService: RecipesService) { }

  ngOnInit(): void {

    if (this.recipesService.recipes.length == 0){
      this.recipesService.getRecipes()
        .subscribe((recipes: any) => {
          this.loaded = true;
          // console.log(recipes);
        },
        error => {
          console.log("Recepes didn't download");
        });
    } else {
      this.loaded = true;
    }
  }

}
