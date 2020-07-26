import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

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
    private meta: Meta,
    private recipesService: RecipesService) { 

    // this.meta.updateTag({ name: 'og:description', content: 'These recipes are generated using a Neural Network. The model is a fine tuned version of GTP-2.'});
    // this.meta.updateTag({ name: 'og:title', content: 'Artificial Recipes' });
  }

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
