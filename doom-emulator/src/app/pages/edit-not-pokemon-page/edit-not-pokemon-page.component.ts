import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { PokemonsService } from "../../pokemons/pokemons.service";
import { PokemonCard } from "../../pokemons/pokemon-card";

@Component({
  selector: 'app-edit-not-pokemon-page',
  templateUrl: './edit-not-pokemon-page.component.html',
  styleUrls: ['./edit-not-pokemon-page.component.css']
})
export class EditNotPokemonPageComponent implements OnInit {

  public notPokemonCard: PokemonCard;

  constructor(
    private pokemonsService: PokemonsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Quick and dirty =')
    this.pokemonsService.getPokemonCard().subscribe((pokemonCards: PokemonCard[]) => {

        this.route.paramMap.subscribe(
          (paramMap: any)=>{
            var notPokemonId = paramMap.params.notPokemonId;
            this.notPokemonCard = this.pokemonsService.getPokemonCardById(notPokemonId);
            console.log(this.notPokemonCard)
          })


      },
      error => {
        console.log(error);
      });
  }

}
