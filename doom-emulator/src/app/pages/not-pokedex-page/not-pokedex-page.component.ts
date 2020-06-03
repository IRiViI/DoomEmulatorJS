import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

import { PokemonCardComponent } from "../../pokemons/pokemon-card/pokemon-card.component";

import { PokemonsService } from "../../pokemons/pokemons.service";
import { PokemonCard } from "../../pokemons/pokemon-card";

import { faThumbsUp, faSkull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-pokedex-page',
  templateUrl: './not-pokedex-page.component.html',
  styleUrls: ['./not-pokedex-page.component.css']
})
export class NotPokedexPageComponent implements OnInit {

  public notPokemons: PokemonCard[] = [];

  public faThumbsUp = faThumbsUp;
  public faSkull = faSkull;

  constructor(
    private pokemonsService: PokemonsService
    ) { }

  ngOnInit(): void {
    this.pokemonsService.getPokemonCard()
      .subscribe(
        (notPokemonCards) => {
          this.notPokemons = notPokemonCards;
        });

  }

  public onLike(notPokemon: PokemonCard){
    notPokemon.isLiked = !notPokemon.isLiked;
    this.pokemonsService.likePokemonCard(notPokemon, notPokemon.isLiked)
      .subscribe(
        () => {

        });
  }

  public onReport(notPokemon: PokemonCard){
    notPokemon.isReported = !notPokemon.isReported;
    this.pokemonsService.reportPokemonCard(notPokemon, notPokemon.isReported)
      .subscribe(
        () => {

        });

  }

}
