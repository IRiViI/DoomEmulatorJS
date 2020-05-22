import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

@Component({
  selector: 'app-not-my-starter-six-page',
  templateUrl: './not-my-starter-six-page.component.html',
  styleUrls: ['./not-my-starter-six-page.component.css']
})
export class NotMyStarterSixPageComponent implements OnInit {


  private generatorModel;

  public notPokemonValues: any[] = [];

  public dim:number = 3*64;


  constructor() { }

  ngOnInit(): void {



    for (let i = 0; i<6; i++){
      this.notPokemonValues.push([]);
      this.randomizeValues(i);
    }

    this.initiateModel();
  }

  async private initiateModel(){
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

  async loadModels(){

    const GENERATOR_MODEL_URL = 'assets/models/not_pokemon/generator/model.json';
    this.generatorModel = await tf.loadLayersModel(GENERATOR_MODEL_URL);
  }

  async refresh() {
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
      // Display the image
      const image = await tf.browser.toPixels(scaled_frame.reshape([64, 64,3]));
      var idata = new ImageData(image,64,64);
      const canvas: any = document.getElementById("my_image_"+i);
      const ctx = canvas.getContext('2d');
      this.putImageData(ctx,idata,this.dim/64);
    }
    tf.dispose(outputs);

    // this.running = false;
  }

  public onChangeSlider(index, value){
    // this.sliderValues[index] = value;
    this.updateFrame();
  }

  public reset(){
  //   for (let sliderIndex in this.sliderValues){
  //     this.sliderValues[sliderIndex]=0;
  //   }
  //   this.updateFrame();
  }
}
