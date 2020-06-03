import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import {PokemonCardComponent} from "../../pokemons/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-not-my-starter-six-page',
  templateUrl: './not-my-starter-six-page.component.html',
  styleUrls: ['./not-my-starter-six-page.component.css']
})
export class NotMyStarterSixPageComponent implements OnInit {

  @ViewChildren(PokemonCardComponent) pokemonCards!: QueryList<PokemonCardComponent>;

  private generatorModel;

  public notPokemonValues: any[] = [];

  public imagesData: ImageData[] = [];

  public notPokemons = [{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  },{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  },{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  },{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  },{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  },{
    name: undefined,
    type1: undefined,
    type2: undefined,
    type3: undefined,
    description: undefined,
    imageData: undefined
  }]


  constructor() { }

  ngOnInit(): void {


    for (let i = 0; i<6; i++){
      this.notPokemonValues.push([]);
      this.randomizeValues(i);
    }

    this.initiateModel();
  }

  private async initiateModel(){
    await this.loadModels();
    this.refresh();
  }


  private randomizeValues(index: number){
      let values = [];
      for (let j = 0; j<100; j++){
        values.push(this.normalRandom());
      }
      this.notPokemonValues[index] = values;
  }

  public refreshPokemon(i: number){
    this.randomizeValues(i); 
    this.refresh();
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
    for (let i = 0; i < 6; i++){
      // var input = tf.expandDims(tf.tensor1d(this.notPokemonValues[i]),0);

      var frame = outputs.slice([0+i], [1]);
      var scaled_frame = tf.div(tf.add(frame,1),2);
      var selected: any = scaled_frame.reshape([64, 64,3]);
      // Display the image
      const image = await tf.browser.toPixels(selected);
      var idata = new ImageData(image,64,64);
      this.notPokemons[i].imageData = idata;
    }
    tf.dispose(outputs);

    for (let pokemonCard of this.pokemonCards){
      pokemonCard.drawImage();
    }

    // this.running = false;
  }

  public onChangeSlider(index, value){
    // this.sliderValues[index] = value;
    // this.updateFrame();
  }

  public reset(){
  //   for (let sliderIndex in this.sliderValues){
  //     this.sliderValues[sliderIndex]=0;
  //   }
  //   this.updateFrame();
  }
}
