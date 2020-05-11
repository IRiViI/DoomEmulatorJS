import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

@Component({
  selector: 'app-doom-sliders-page',
  templateUrl: './doom-sliders-page.component.html',
  styleUrls: ['./doom-sliders-page.component.css']
})
export class DoomSlidersPageComponent implements OnInit {

  private decoderModel;
  public running: boolean = false;

  public sliderValues: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public sliderLabels: string[] = [
    "0",
    "Walls",
    "2",
    "3",
    "Hand",
    "Dash",
    "Shoot",
    "Dash",

    "Up/down",
    "9",
    "Up/down",
    "11",
    "Closing",
    "13",
    "14",
    "15",
    "16"
  ];

  constructor() { }

  ngOnInit(): void {

    this.loadModels();
  }

  async loadModels(){

    const DECODER_MODEL_URL = 'assets/models/doom/decoder/model.json';
    this.decoderModel = await tf.loadLayersModel(DECODER_MODEL_URL);
  }

  async updateFrame() {
    if (!this.decoderModel || this.running){
      return
    }
    this.running = true;


    var input = tf.expandDims(tf.tensor1d(this.sliderValues),0);
    var outputs = this.decoderModel.predict(input);

    var frame = outputs.slice([0], [1]);
    // Display the image
    const image = await tf.browser.toPixels(frame.reshape([640, 480,3]));
    var idata = new ImageData(image,640,480);
    const canvas: any = document.getElementById("my_image");
    const ctx = canvas.getContext('2d');
    ctx.putImageData(idata, 0, 0, 0, 0, 640, 480);
    tf.dispose(outputs);

    this.running = false;
  }

  public onChangeSlider(index, value){
    // this.sliderValues[index] = value;
    this.updateFrame();
  }

  public trackByIdx(index: number, obj: any): any {
    return index;
  }

  public reset(){
    for (let sliderIndex in this.sliderValues){
      this.sliderValues[sliderIndex]=0;
    }
    this.updateFrame();
  }



}
