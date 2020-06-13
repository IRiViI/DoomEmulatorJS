import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { environment } from '../../environments/environment';
import { PokemonCard } from "./pokemon-card";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {


  private image_url: string = "https://www.ricksprojects.com:3002/";

  private pokemonCards = [];

    constructor(
      private http: HttpClient, 
      private router: Router
      ) {}

  public getPokemonCard(): Observable<any[]>{
    return this.http.get<{message: string; data: any[]}>(
        environment.apiUrl + '/pokemons/pokemonCards'
      )
      .pipe(map((result:any) => {
        var pokemonCards = result.result.map(pokemonCardsData => {
          // graphProperties.id = graphProperties._id;
          // return new Graph(graphProperties);
          if (pokemonCardsData.src.substring(0, 7) == "uploads"){
            pokemonCardsData.src = this.image_url+pokemonCardsData.src;
            if (pokemonCardsData.redesignSrc){
              pokemonCardsData.redesignSrc = this.image_url+pokemonCardsData.redesignSrc;
            }
          }
          // if ()
          return pokemonCardsData;
        });
        this.updateLikes(pokemonCards);
        this.updateReport(pokemonCards);
        this.pokemonCards = pokemonCards;
        return pokemonCards
      }),)
      // .pipe(map((graphs: Graph[])=>{
      //   this.graphs = graphs;
      //   this.graphsUpdated.next([...this.graphs]);
      //   return graphs
      // }))
  };

  public getPokemonCardById(_id: string){
    for (let card of this.pokemonCards){
      if (card._id == _id){
        return card;
      }
    }
    return undefined;
  }

  public createCard(pokemonCard: PokemonCard): Observable<any>{
    const formData = new FormData();
    formData.append("redesignImage", pokemonCard.redesignImage)
    formData.append("image", pokemonCard.image)
    let data = {
        trainerName: pokemonCard.trainerName,
        name: pokemonCard.name,
        type1: pokemonCard.type1,
        type2: pokemonCard.type2,
        type3: pokemonCard.type3,
        description: pokemonCard.description,
        encodedGeneratorValue: pokemonCard.encodedGeneratorValue,
    };
    for (let key in data){
      formData.append(key, data[key])
    }
    // formData.append("body", data)
    return this.http.post<any>(
        environment.apiUrl + '/pokemons/pokemonCards',
        formData
      )

  };

  public patchRedesignImage(pokemonCard: PokemonCard){
    const formData = new FormData();
    formData.append("redesignImage", pokemonCard.redesignImage);
    return this.http.patch<any>(
        environment.apiUrl + '/pokemons/pokemonCards/' + pokemonCard._id,
        formData
      )
  }

  public patchImage(pokemonCard: PokemonCard){
    const formData = new FormData();
    formData.append("image", pokemonCard.image);
    return this.http.patch<any>(
        environment.apiUrl + '/pokemons/pokemonCards/' + pokemonCard._id,
        formData
      )
  }

  // public uploadImage(): Observable<any>{
  //   let data = {};
  //   return this.http.post<any>(
  //       environment.apiUrl + '/pokemons/pokemonImage',
  //       data
  //     )
  // };

  public likePokemonCard(pokemonCard: PokemonCard, state: boolean){
    var likedNotPokemons = JSON.parse(localStorage.getItem('likedNotPokemons'));
    if (!likedNotPokemons){
      likedNotPokemons = [];
    }
    var matched = false;
    for (let likedNotPokemon of likedNotPokemons){
      if (likedNotPokemon._id == pokemonCard._id){
        likedNotPokemon.state = state;
        matched = true;
        break
      }
    }
    if (matched == false){
      likedNotPokemons.push({
        _id: pokemonCard._id,
        state: state
      })
    }
    localStorage.setItem('likedNotPokemons', JSON.stringify(likedNotPokemons));

    let data = {
      _id: pokemonCard._id,
      state: state
    };
    return this.http.post<any>(
        environment.apiUrl + '/pokemons/like',
        data
      )
  };

  public updateLikes(pokemonCards: PokemonCard[]){
    for (let pokemonCard of pokemonCards){
      pokemonCard.isLiked = false;
    }
    var likedNotPokemons = JSON.parse(localStorage.getItem('likedNotPokemons'));
    if (!likedNotPokemons){
      likedNotPokemons = [];
    }
    for (let likedNotPokemon of likedNotPokemons){
      for (let pokemonCard of pokemonCards){
        if (likedNotPokemon._id == pokemonCard._id){
          pokemonCard.isLiked = likedNotPokemon.state;
        }
      }
    }
  }

  public reportPokemonCard(pokemonCard: PokemonCard, state: boolean){
    var reportedNotPokemons = JSON.parse(localStorage.getItem('reportedNotPokemons'));
    if (!reportedNotPokemons){
      reportedNotPokemons = [];
    }
    var matched = false;
    for (let reportedNotPokemon of reportedNotPokemons){
      if (reportedNotPokemon._id == pokemonCard._id){
        reportedNotPokemon.state = state;
        matched = true;
        break
      }
    }
    if (matched == false){
      reportedNotPokemons.push({
        _id: pokemonCard._id,
        state: state
      })
    }
    localStorage.setItem('reportedNotPokemons', JSON.stringify(reportedNotPokemons));

    let data = {
      _id: pokemonCard._id,
      state: state
    };
    return this.http.post<any>(
        environment.apiUrl + '/pokemons/report',
        data
      )

  };

  public updateReport(pokemonCards: PokemonCard[]){
    for (let pokemonCard of pokemonCards){
      pokemonCard.isReported = false;
    }
    var reportedNotPokemons = JSON.parse(localStorage.getItem('reportedNotPokemons'));
    if (!reportedNotPokemons){
      reportedNotPokemons = [];
    }
    for (let reportedNotPokemon of reportedNotPokemons){
      for (let pokemonCard of pokemonCards){
        if (reportedNotPokemon._id == pokemonCard._id){
          pokemonCard.isReported = reportedNotPokemon.state;
        }
      }
    }
  }

}
