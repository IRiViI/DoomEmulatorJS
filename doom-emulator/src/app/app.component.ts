import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';

import { Subscription, Subject, Observable } from 'rxjs';

import { AuthService } from "./auth/auth.service";

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {



  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    private meta: Meta,
    private authService: AuthService,
    public router: Router,
    private ccService: NgcCookieConsentService) {

    // this.meta.addTags([
    //       // {name: 'description', content: 'How to use Angular 4 meta service'},
    //       {name: 'author', content: 'talkingdotnet'},
    //       {name: 'keywords', content: 'Angular, Meta Service'}
    //     ]);
        // this.meta.updateTag({ name: 'description', content: 'Test' });
    // this.meta.addTags([
    //   {name: 'og:author', content: 'Rick Vink'},
    //   {name: 'og:image', content: '/assets/images/recipe_image.png'},
    //   {name: 'og:description', content: "Artificial intelligence, Deep Learning, Machine Learning they're all very exciting techniques. But for most people, those techniques are still quite far away. So, what could one guy do with a computer and some questionable priorities when it comes to spending its time achieve? Well, let's find out and have some fun with quite advanced Artificial Intelligence!"}
    // ]);
        // this.meta.updateTag({ name: 'og:description', content: 'Test' });

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }

    });
  }


  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // console.log(event);
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // console.log(event);
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });


    this.authService.autoAuthUser()
      .subscribe((out: any)=>{

        console.log(out)
        
      // let user = this.authService.getUser();
      // this.graphsService.getUserGraphs(user)
      //   .subscribe((graphs: Graph[])=>{
          
      //     let selected_graph_id = localStorage.getItem("selected_graph_id");
      //     let selected_graph = graphs.find((graph)=>{
      //       if (graph._id == selected_graph_id){
      //         return true;
      //       }
      //     })
      //     this.graphsService.selectGraph(selected_graph);
      //   });
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
