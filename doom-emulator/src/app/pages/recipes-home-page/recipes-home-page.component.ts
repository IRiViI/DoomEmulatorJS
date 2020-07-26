import { Component, OnInit } from '@angular/core';
// import { Meta } from '@angular/platform-browser';

import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";
import { RobotsService } from "../../robots/robots.service";
import { Robot } from "../../robots/robot";

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

  public robots: Robot[];

  constructor(
    // private meta: Meta,
    private recipesService: RecipesService,
    private robotsService: RobotsService) {
    // this.meta.addTags([
    //   { name: 'og:title', content: 'Artificial Recipes' },
    //   { name: 'og:url', content: 'https://www.ricksprojects.com/projects/recipes/home' },
    //   { name: 'og:description', content: 'These recipes are generated using a Neural Network. The model is a fine tuned version of GTP-2.' },
    //   { name: 'og:image', content: '/assets/images/recipe_image.png' },
    //   { name: 'title', content: 'Artificial Recipes' },
    //   { name: 'url', content: 'https://www.ricksprojects.com/projects/recipes/home' },
    //   { name: 'description', content: 'These recipes are generated using a Neural Network. The model is a fine tuned version of GTP-2.' },
    //   { name: 'image', content: '/assets/images/recipe_image.png' },
    // ], true);
        // this.meta.updateTag({ name: 'description', content: 'These recipes are generated using a Neural Network. The model is a fine tuned version of GTP-2.' });
        // this.meta.updateTag({ name: 'og:description', content: 'These recipes are generated using a Neural Network. The model is a fine tuned version of GTP-2.' });
        // this.meta.updateTag({ name: 'title', content: 'Artificial Recipes' });
        // this.meta.updateTag({ name: 'og:title', content: 'Artificial Recipes' });
  }


  ngOnInit(): void {

    this.robots = this.robotsService.robots;

    this.recipes = this.recipesService.recipes;
    for (let recipe of this.recipes){
      this.shownRecipes.push(recipe);
    }
    console.log(this.recipes)
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
    this.onCheckCategory()
    var shownRecipes = this.shownRecipes.map((recipe) => recipe);
    this.shownRecipes.splice(0,this.shownRecipes.length);
    var keys = term.split(" ").map(key => key.toLowerCase());
    for (let recipe of shownRecipes){
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
            match = false;
            break
        }
      }
      if (match){
        this.shownRecipes.push(recipe);
      }
    }
  }

  public onRandomOne(term: string){
    this.onSearch(term)
    var chosen = this.shownRecipes[Math.floor(Math.random() * this.shownRecipes.length)];
    this.shownRecipes.splice(0,this.shownRecipes.length);
    this.shownRecipes.push(chosen);
  }

}
