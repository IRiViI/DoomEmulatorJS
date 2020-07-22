import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipes-home-page',
  templateUrl: './recipes-home-page.component.html',
  styleUrls: ['./recipes-home-page.component.css']
})
export class RecipesHomePageComponent implements OnInit {

  public recipes: Recipe[] = [];
  public shownRecipes: Recipe[] = [];
  public categories: any[] = [];

  public faSearch = faSearch;

  constructor(
    private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
    for (let recipe of this.recipes){
      this.shownRecipes.push(recipe);
    }
    this.updateCategories();
  }

  private updateCategories(){
    this.categories.splice(0, this.categories.length);
    for (let recipe of this.recipes){
      for (let category of recipe.categories){
        let match = false;
        for (let i_category of this.categories){
          if (i_category["name"] == category){
            match = true;
            i_category["count"]++;
            break
          }
        }
        if (match==false){
          this.categories.push({
            name: category,
            count: 1,
            value: false
          })
        }
      }
    }
    this.categories.sort((a,b) => (a.count < b.count) ? 1 : -1)
  }

  public onSearch(term: string){
    this.shownRecipes.splice(0,this.shownRecipes.length);
    var keys = term.split(" ").map(key => key.toLowerCase());
    for (let recipe of this.recipes){
      let match = true;
      let title = recipe.title.toLowerCase();
      for (let key of keys){
        if (!title.includes(key)){
          match = false;
          break
        }
      }
      if (match){
        this.shownRecipes.push(recipe);
      }
    }
  }

  public onCheckCategory(){
    this.shownRecipes.splice(0,this.shownRecipes.length);
    for (let recipe of this.recipes){
      let match = true;
      for (let category of this.categories){
        if (!category.value){
          continue
        }
        if (!recipe.categories.includes(category.name)){
          // console.log(recipe)
            match = false;
            break
        }
      }
      if (match){
        this.shownRecipes.push(recipe);
      }
    }
  }

}
