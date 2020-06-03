import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { PokemonCard } from "../pokemon-card";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('myImage', { static: false }) public myImage: ElementRef;
  @ViewChild('redesignImage', { static: false }) public redesignImage: ElementRef;

  public dim:number = 3*64;

  private imageDiv;

  public types: string[] = [
    "",
    "Normal",  "Fire",
    "Fighting",  "Water",
    "Flying",  "Grass",
    "Poison",  "Electric",
    "Ground",  "Psychic",
    "Rock",  "Ice",
    "Bug",  "Dragon",
    "Ghost",  "Dark",
    "Steel",  "Fairy"
  ];

  @Input() notPokemon : PokemonCard;
  // {
  //       trainerName: string,
  //       name: string,
  //       type1: string,
  //       type2: string,
  //       type3: string,
  //       description: string,
  //       encodedGeneratorValue: string,
  //       image: any,
  //       imageData: any,
  //       redesignImage: any
  //     };
  @Output() refresh = new EventEmitter();
  @Output() upload = new EventEmitter();
  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
      this.drawImage();
  }

  private putImageData(ctx, imageData, scale) {
    var scaled = ctx.createImageData(this.dim, this.dim);

    for(var row = 0; row < imageData.height; row++) {
      for(var col = 0; col < imageData.width; col++) {
        var sourcePixel = [
          imageData.data[(row * imageData.width + col) * 4 + 0],
          imageData.data[(row * imageData.width + col) * 4 + 1],
          imageData.data[(row * imageData.width + col) * 4 + 2],
          imageData.data[(row * imageData.width + col) * 4 + 3]
        ];
        for(var y = 0; y < scale; y++) {
          var destRow = row * scale + y;
          for(var x = 0; x < scale; x++) {
            var destCol = col * scale + x;
            for(var i = 0; i < 4; i++) {
              scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
                sourcePixel[i];
            }
          }
        }
      }
    }

    ctx.putImageData(scaled, 0, 0, 0, 0, this.dim, 2*this.dim);
  }

  public selectImage(event){
    if (event.target.files.length > 0){
      this.notPokemon.redesignImage = event.target.files[0];
      console.log(this.notPokemon.redesignImage);

      var img: any = this.redesignImage.nativeElement;
      // const ctx = canvas.getContext('2d');

      var imageObj = new Image();
      imageObj.onload = ()=>{
        // ctx.drawImage(imageObj, 0, 0);
      };
      img.src = URL.createObjectURL(this.notPokemon.redesignImage);

    }
  }

  public drawImage(){
    if (! this.myImage || !this.notPokemon.imageData) return;

    const canvas: any = this.myImage.nativeElement;
    const ctx = canvas.getContext('2d');
    this.putImageData(ctx, this.notPokemon.imageData, this.dim/64);
  }

  ngOnChanges(changes) {

  }

  public onSubmit(){

    const canvas: any = this.myImage.nativeElement;
    canvas.toBlob((blob)=>{
      this.notPokemon.image = blob;
      console.log(this.notPokemon)

      if (!this.notPokemon.name){
        alert("name missing");
      }
      else if (!this.notPokemon.type1){
        alert("Must have type 1");
      }
      else if (!this.notPokemon.description){
        alert("Misses a description");
      } else {
        this.submit.emit();
      }
    }, 'image/png', 0.95);

  }

}
