import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { PokemonsService } from "../../pokemons/pokemons.service";
import { PokemonCard } from "../../pokemons/pokemon-card";

@Component({
  selector: 'app-edit-not-pokemon-page',
  templateUrl: './edit-not-pokemon-page.component.html',
  styleUrls: ['./edit-not-pokemon-page.component.css']
})
export class EditNotPokemonPageComponent implements OnInit {


  @ViewChild('myImage', { static: false }) public myImage: ElementRef;
  @ViewChild('redesignImage', { static: false }) public redesignImage: ElementRef;

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


  public selectRedesignImage(event){
    if (event.target.files.length > 0){
      this.notPokemonCard.redesignImage = event.target.files[0];

      var img: any = this.redesignImage.nativeElement;
      // const ctx = canvas.getContext('2d');

      var imageObj = new Image();
      imageObj.onload = ()=>{
        // ctx.drawImage(imageObj, 0, 0);
      };
      img.src = URL.createObjectURL(this.notPokemonCard.redesignImage);

    }
  }


  public selectImage(event){
    if (event.target.files.length > 0){
      this.notPokemonCard.image = event.target.files[0];

      var img: any = this.myImage.nativeElement;
      // const ctx = canvas.getContext('2d');

      var imageObj = new Image();
      imageObj.onload = ()=>{
        // ctx.drawImage(imageObj, 0, 0);
      };
      img.src = URL.createObjectURL(this.notPokemonCard.image);

    }
  }

  public onUploadRedesignImage(){
    this.pokemonsService.patchRedesignImage(this.notPokemonCard)
      .subscribe((_: any) => {

      });
  }

  public onUploadMyImage(){
    this.pokemonsService.patchImage(this.notPokemonCard)
      .subscribe((_: any) => {

      });
  }

}
