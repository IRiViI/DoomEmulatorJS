import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  public userIsAuthenticated:boolean = false;

  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  public onSignup(user){
    this.authService.createUser(user.name, user.password, user.email)
      .subscribe(
        response => {
          alert("Done, you can signin now =)")
          this.router.navigate(["/auth"]);
        }, 
        error =>{
          console.error(error)
        });
  }

  public onSignin(user){
    this.authService.login(user.email, user.password)
      .subscribe(
        response => {
          this.router.navigate(["/home"]);
        }, 
        error =>{
          console.error(error)
        });
    }

  public onLogout(){
    this.authService.logout();
  }




  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
