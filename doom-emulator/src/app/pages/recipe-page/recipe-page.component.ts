import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { RecipesService } from "../../recipes/recipes.service";
import { Recipe } from "../../recipes/recipe";
import { RobotsService } from "../../robots/robots.service";
import { Robot } from "../../robots/robot";

import { faChevronRight, faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  public recipe: Recipe;

  public robots: Robot[];

  public faChevronRight = faChevronRight;
  public faChevronLeft = faChevronLeft;
  public faStar = faStar;

  constructor(
    private recipesService: RecipesService,
    private robotsService: RobotsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.robots = this.robotsService.robots;

      this.route.queryParams.subscribe(
        (paramMap: any)=>{
          var id = paramMap.id;
          this.recipe = this.recipesService.getRecipeById(id);
        })
  }

}
