import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,) { }

  ngOnInit(): void {


// <!--   <meta property="og:title" content="Ricks Projects">
//   <meta property="og:type" content="website">
//   <meta property="og:image" content="/assets/images/recipe_image.png">
//   <meta property="og:description" content="Artificial intelligence, Deep Learning, Machine Learning they're all very exciting techniques. But for most people, those techniques are still quite far away. So, what could one guy do with a computer and some questionable priorities when it comes to spending its time achieve? Well, let's find out and have some fun with quite advanced Artificial Intelligence!">
//   <meta name="author" content="Rick Vink"> -->


    this.meta.addTags([
      { name: 'og:title', content: 'Ricks Projects' },
      { name: 'og:url', content: 'https://www.ricksprojects.com/home' },
      { name: 'og:description', content: "Artificial intelligence, Deep Learning, Machine Learning they're all very exciting techniques. But for most people, those techniques are still quite far away. So, what could one guy do with a computer and some questionable priorities when it comes to spending its time achieve? Well, let's find out and have some fun with quite advanced Artificial Intelligence!" },
      { name: 'og:image', content: '/assets/images/recipe_image.png' },
      { name: 'title', content: 'Ricks Projects' },
      { name: 'url', content: 'https://www.ricksprojects.com/home' },
      { name: 'description', content: "Artificial intelligence, Deep Learning, Machine Learning they're all very exciting techniques. But for most people, those techniques are still quite far away. So, what could one guy do with a computer and some questionable priorities when it comes to spending its time achieve? Well, let's find out and have some fun with quite advanced Artificial Intelligence!" },
      { name: 'image', content: '/assets/images/recipe_image.png' },
    ], true);

    this.title.setTitle("Home");
  }

}
