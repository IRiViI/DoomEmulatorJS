import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { Subscription } from 'rxjs';

import { PokemonCardComponent } from "../../pokemons/pokemon-card/pokemon-card.component";

import { PokemonsService } from "../../pokemons/pokemons.service";
import { PokemonCard } from "../../pokemons/pokemon-card";

import { faThumbsUp, faSkull, faEdit } from '@fortawesome/free-solid-svg-icons';

import { User } from "../../user/user";

import { AuthService } from "../../auth/auth.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-not-pokedex-page',
  templateUrl: './not-pokedex-page.component.html',
  styleUrls: ['./not-pokedex-page.component.css']
})
export class NotPokedexPageComponent implements OnInit, OnDestroy {

  public userIsAuthenticated:boolean = false;

  private authListenerSubs: Subscription;

  public user: User;

  public notPokemons: PokemonCard[] = [];

  public faThumbsUp = faThumbsUp;
  public faSkull = faSkull;
  public faEdit = faEdit;


  constructor(
    private authService: AuthService,
    private pokemonsService: PokemonsService
    ) { }

  ngOnInit(): void {

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getUser();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.authService.getUser();
    console.log(this.user);
      });
    console.log(this.user);

    this.pokemonsService.getPokemonCard()
      .subscribe(
        (notPokemonCards) => {
          this.notPokemons = notPokemonCards;
          if (environment.production == false){
            console.log(notPokemonCards)
          }
          // console.log(notPokemonCards);
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

  public onEdit(notPokemon: PokemonCard){
    
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
