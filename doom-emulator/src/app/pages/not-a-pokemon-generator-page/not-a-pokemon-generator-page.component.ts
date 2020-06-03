import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

import { PokemonCardComponent } from "../../pokemons/pokemon-card/pokemon-card.component";

import { PokemonsService } from "../../pokemons/pokemons.service";
import { PokemonCard } from "../../pokemons/pokemon-card";

import { HeaderService } from "../../header/header.service";

import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import { Subscription, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-not-a-pokemon-generator-page',
  templateUrl: './not-a-pokemon-generator-page.component.html',
  styleUrls: ['./not-a-pokemon-generator-page.component.css']
})
export class NotAPokemonGeneratorPageComponent implements OnInit {

  private generatorModel;

  public notPokemonValues: any[] = [];

  public imagesData: ImageData[] = [];

  public dim: number = 3 * 64;

  public numberOfBeginners = 3;

  public selectedNotPokemon: PokemonCard;

  public trainerName;
  public newTrainerName = "";

  public done: boolean = false;

  public notPokemons: PokemonCard[] = [];

  public previousPokemonValuesCounter: number = 3;
  public previousPokemonValuesHistory: number = 20;

  public faCaretRight = faCaretRight;
  public faCaretLeft = faCaretLeft;

  public hasReadTheTermsOfConditions: boolean = false;

  private progressHeaderSubject: Subject<{loading:boolean, value: number}>;

  constructor(
    private pokemonsService: PokemonsService,
    private headerService: HeaderService
    ) { }


  ngOnInit(): void {

    this.progressHeaderSubject = this.headerService.headerSubject;

    this.cleanNotPokemonCards();

    this.drawPokemonValues();

    this.initiateModel();

  }

  public setTrainerName(name){
    if (this.hasReadTheTermsOfConditions==false){
      alert("Read the terms of conditions first and press the checkbox.");
      return
    }
    if (!name){
      alert("Give your trainer name please.");
      return
    }
    this.trainerName = name;
  }

  public selectNotPokemon(index: number){
    this.selectedNotPokemon = this.notPokemons[index];

    // const canvas: any = document.getElementById("my_image_"+index);
    // const src = canvas.toDataURL("image/png");
    // console.log(src);
  }

  private async initiateModel(){

    await this.loadModels();
    this.refresh();
  }

  public cleanNotPokemonCards(){

      this.notPokemons = [{
        trainerName: undefined,
        name: "",
        type1: "",
        type2: "",
        type3: "",
        description: "",
        image: undefined,
        encodedGeneratorValue: undefined,
        imageData: undefined,
        src: undefined,
        redesignImage: undefined,
        redesignSrc: undefined,
      },
      {
        trainerName: undefined,
        name: "",
        type1: "",
        type2: "",
        type3: "",
        description: "",
        image: undefined,
        encodedGeneratorValue: undefined,
        imageData: undefined,
        src: undefined,
        redesignImage: undefined,
        redesignSrc: undefined,
      },
      {
        trainerName: undefined,
        name: "",
        type1: "",
        type2: "",
        type3: "",
        description: "",
        image: undefined,
        encodedGeneratorValue: undefined,
        imageData: undefined,
        src: undefined,
        redesignImage: undefined,
        redesignSrc: undefined,
      }]

    }

  public searchPokemonValues(stride: number){
    this.progressHeaderSubject.next({loading:true, value:undefined});
    // Shift in history
    this.previousPokemonValuesCounter += stride;
    if (this.previousPokemonValuesCounter < 3){
      this.previousPokemonValuesCounter = 3;
    }
    if (this.previousPokemonValuesCounter > this.previousPokemonValuesHistory - stride){
      this.previousPokemonValuesCounter = this.previousPokemonValuesHistory - stride;
    }
    // Get all the current history values
    let currentMyPokemonValues: string[] = JSON.parse(localStorage.getItem('myNotPokemonValues'));
    // Alert if there is no history
    if (!currentMyPokemonValues){
      alert("No previous pokemons found");
      return;
    }
    // Process 
    const maxV = currentMyPokemonValues.length;
    var counter = 0;
    for (let myPokemonValue of currentMyPokemonValues.slice(maxV-this.previousPokemonValuesCounter, maxV-this.previousPokemonValuesCounter+3)){
      this.notPokemonValues[counter] = this.encodedValuesToGeneratorValues(myPokemonValue);
      counter++;
    }
    this.refresh();
    this.progressHeaderSubject.next({loading:false, value:undefined});
  }

  public drawPokemonValues(){

    // Get pokemons from memmory
    let currentMyPokemonValues: string[] = JSON.parse(localStorage.getItem('myNotPokemonValues'));
    if (!currentMyPokemonValues){
      currentMyPokemonValues = [];
    }
    for (let i = 0; i<this.numberOfBeginners; i++){
      // this.imagesData.push([]);
      this.randomizeValues(i);

      currentMyPokemonValues.push(this.notPokemons[i].encodedGeneratorValue);
    }

    while (currentMyPokemonValues.length > this.previousPokemonValuesHistory){
      currentMyPokemonValues.shift();
    }

    localStorage.setItem('myNotPokemonValues', JSON.stringify(currentMyPokemonValues));
  }


  public redraw(){
    this.progressHeaderSubject.next({loading:true, value:undefined})
    this.drawPokemonValues();
    this.refresh();
    this.progressHeaderSubject.next({loading:false, value:undefined})
  }


  private randomizeValues(index: number){
    const minValue = -3;
    const maxValue = 3;
    let values = [];
    this.notPokemons[index].encodedGeneratorValue = "";
    for (let j = 0; j<100; j++){
      let value = undefined;
      while (value < minValue || value > maxValue || value === undefined){
        value = this.normalRandom();
        let encodedGeneratorValue = this.generatorValueToEncodedValue(value);
        this.notPokemons[index].encodedGeneratorValue += encodedGeneratorValue;
        value = this.encodedValueToGeneratorValue(encodedGeneratorValue);
      }
      values.push(value);
    }
    this.notPokemonValues[index] = values;
  }

  public generatorValueToEncodedValue(value:number, minValue:number=-3, maxValue:number=3){
    return Math.floor(1296 * (value - minValue) / (maxValue - minValue)).toString(36);;
  }

  public encodedValueToGeneratorValue(value:string, minValue:number=-3, maxValue:number=3){
    return parseInt(value, 36)/1296 * (maxValue - minValue) + minValue;
  }

  public encodedValuesToGeneratorValues(code: string){
    var values = [];
    for (let index=0; index < 200; index+=2){
      let part = this.encodedValueToGeneratorValue(code.slice(index,index+2));
      values.push(part);
    }
    return values;
  }



  private normalRandom()
  {

    var spareRandom = null;

    var val, u, v, s, mul;

    if(spareRandom !== null)
    {
      val = spareRandom;
      spareRandom = null;
    }
    else
    {
      do
      {
        u = Math.random()*2-1;
        v = Math.random()*2-1;

        s = u*u+v*v;
      } while(s === 0 || s >= 1);

      mul = Math.sqrt(-2 * Math.log(s) / s);

      val = u * mul;
      spareRandom = v * mul;
    }
    
    return val;
  }

  private async loadModels(){
    // const GENERATOR_MODEL_URL = "https://ricksprojectspokegan.s3.eu-central-1.amazonaws.com/models/not_pokemon/generator/model.json";
    const GENERATOR_MODEL_URL = 'assets/models/not_pokemon/generator/model.json';
    this.generatorModel = await tf.loadLayersModel(GENERATOR_MODEL_URL);
  }

  public async refresh() {
    // if (!this.generatorModel || this.running){
    //   return
    // }
    // this.running = true;
    var inputs = tf.tensor2d(this.notPokemonValues);
    var outputs = this.generatorModel.predict(inputs);
    for (let i = 0; i < this.numberOfBeginners; i++){
      // var input = tf.expandDims(tf.tensor1d(this.notPokemonValues[i]),0);

      var frame = outputs.slice([0+i], [1]);
      var scaled_frame = tf.div(tf.add(frame,1),2);
      var selected: any = scaled_frame.reshape([64, 64,3]);
      // Display the image
      const image = await tf.browser.toPixels(selected);
      var idata = new ImageData(image,64,64);
      this.imagesData[i] = idata;

      const canvas: any = document.getElementById("my_image_"+i);
      const ctx = canvas.getContext('2d');
      this.putImageData(ctx, idata, this.dim/64);
      this.notPokemons[i].imageData = idata;
    }
    tf.dispose(outputs);


    // this.running = false;
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

  public onChangeSlider(index, value){
    // this.sliderValues[index] = value;
    // this.updateFrame();
  }

  public restart(){
    this.done = false;
    this.selectedNotPokemon = undefined;
    this.redraw();
  //   for (let sliderIndex in this.sliderValues){
  //     this.sliderValues[sliderIndex]=0;
  //   }
  //   this.updateFrame();
  }

  public onSubmit(){
    this.selectedNotPokemon.trainerName = this.trainerName;
    this.pokemonsService.createCard(this.selectedNotPokemon)
      .subscribe(() => {
        this.done = true;
      },
      error => {
        alert("Oeps, something when wrong, is your file larger than 2mb?");
        console.log(error);
      });
  }

  public readConditionsChange(event){
    this.hasReadTheTermsOfConditions = event.checked;
  }

}
