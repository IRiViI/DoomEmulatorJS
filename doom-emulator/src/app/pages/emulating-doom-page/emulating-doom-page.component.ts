import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-emulating-doom-page',
  templateUrl: './emulating-doom-page.component.html',
  styleUrls: ['./emulating-doom-page.component.css']
})
export class EmulatingDoomPageComponent implements OnInit {

  private decoderModel;
  private extrapolationModel;

  public fps: number = 0;

  public action_index = 0;
  private currentEncodings = tf.zeros([1, 6, 16]);
  private currentActions = tf.zeros([1, 6, 3]);

  public frame_skip = 6;
  public frame_counter = 0;

  public selected = 0;

  public left;
  public right;
  public shoot;

  public running: boolean = false;

  private currentTime;

  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;

  constructor() { }

  ngOnInit(): void {
    // const cat = document.getElementById('cat');
    // model.execute(tf.browser.fromPixels(cat));
    // this.runModel();

    document.addEventListener('keydown', (event)=>{
      // Left arrow key or A key is right
      if(event.keyCode == 37 || event.keyCode == 65) {
        this.action_index=0;
        this.left = true;
        this.right = false;
        this.shoot = false;
      }
      // Right arrow key or D key is right
      else if(event.keyCode == 39 || event.keyCode == 68) {
        this.action_index=1;
        this.left = false;
        this.right = true;
        this.shoot = false;
      }
      // Space bar is shooting
      else if(event.keyCode == 32) {
        this.action_index=2;
        this.left = false;
        this.right = false;
        this.shoot = true;
      }
    });

    this.currentTime = new Date().getTime()/1000;
  }

  public onValChange(value){
    this.action_index=value;
  }

  async runModel(){
    if (this.running == true){
      return;
    }
    this.running = true;
    await this.loadModels();
    for (let i = 0; i < 300; i++){
      if (this.running == false){
        break;
      }
      await this.nextFrame();
    }
    this.running = false;
   //  setInterval(()=>{
   // }, 500);
  }

  async loadModels(){

    const DECODER_MODEL_URL = 'assets/models/doom/decoder/model.json';
    this.decoderModel = await tf.loadLayersModel(DECODER_MODEL_URL);

    const EXTRAPOLATION_MODEL_URL = 'assets/models/doom/extrapolation/model.json';
    this.extrapolationModel = await tf.loadLayersModel(EXTRAPOLATION_MODEL_URL);
  }

  async nextFrame() {

    this.frame_counter= this.frame_counter+1;

    // Add new action
    var action_vector = [0,0,0];
    action_vector[this.action_index]=1;
    var new_action = tf.tensor1d(action_vector);
    console.log(action_vector);
    // The part to keep
    var previous_actions_part = this.currentActions.slice([0,1],[1,5]);
    // Glue the parts together
    tf.dispose(this.currentActions);
    this.currentActions = tf.concat([previous_actions_part, new_action.expandDims(0).expandDims(0)],1);

    // Predict the next encoding
    var next_encodings = this.extrapolationModel.predict([this.currentEncodings, this.currentActions]);
    var next_encoding = next_encodings.slice([0], [1]);
    // The part to keep
    var previous_part = this.currentEncodings.slice([0,1],[1,5]);
    // Glue the parts together
    tf.dispose(this.currentEncodings);
    this.currentEncodings = tf.concat([previous_part, next_encoding.expandDims(0)],1);

    if ((this.frame_counter % (this.frame_skip + 1)) == 0){

      // Decode the encoding
      var outputs = this.decoderModel.predict(next_encoding);
      var frame = outputs.slice([0], [1]);
      // Display the image
      const image = await tf.browser.toPixels(frame.reshape([640, 480,3]));
      var idata = new ImageData(image,640,480);
      const canvas: any = document.getElementById("my_image");
      const ctx = canvas.getContext('2d');
      ctx.putImageData(idata, 0, 0, 0, 0, 640, 480);
      tf.dispose(image);

      // Update FPS counter
      var newTime = new Date().getTime()/1000;
      this.fps = 1/(newTime-this.currentTime);
      this.currentTime = newTime;
    }
  }

  public addFrameSkip(value: number): void{
    this.frame_skip+=value;
  }

}
