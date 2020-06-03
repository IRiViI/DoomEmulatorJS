import { Component, OnInit } from '@angular/core';
import { TestsService } from "../../tests/tests.service";

@Component({
  selector: 'app-tests-page',
  templateUrl: './tests-page.component.html',
  styleUrls: ['./tests-page.component.css']
})
export class TestsPageComponent implements OnInit {

  constructor(
    private testsService: TestsService) { }

  ngOnInit(): void {
  }

  public selectImage(event){

    if (event.target.files.length > 0){
      let image = event.target.files[0];
      console.log(image);

      // var img: any = this.redesignImage.nativeElement;
      // // const ctx = canvas.getContext('2d');

      // var imageObj = new Image();
      // imageObj.onload = ()=>{
      //   // ctx.drawImage(imageObj, 0, 0);
      // };
      // img.src = URL.createObjectURL(this.notPokemon.redesignImage);
      this.testsService.createImage({
        image: image
      }).subscribe(
        () => {

        });
    }
  }

}
