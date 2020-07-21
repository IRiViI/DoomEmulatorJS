import { Injectable } from '@angular/core';
import { Recipe } from "./recipe";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  public recipes: Recipe[] = [];
  private externalHttpClient: HttpClient;

  constructor(
      private handler: HttpBackend,
      // private http: HttpClient, 
      ) {
    this.externalHttpClient = new HttpClient(handler);
  }

  public getRecipes(): Observable<Recipe[]>{

      let headers = new HttpHeaders();
      return this.externalHttpClient.get<any>(//:Recipe[]
          "https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/data/recipes.json", 
        )
        .pipe(map((recipes:Recipe[]) => {
          for (let recipe of recipes){
            this.recipes.push(recipe);
          }
          return recipes
        }),)

  }
}
