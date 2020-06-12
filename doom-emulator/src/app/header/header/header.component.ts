import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from "../header.service";

import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userIsAuthenticated = false;
  public isLoading = false;

  public faUser = faUser;

  private authListenerSubs: Subscription;

  constructor(
    private headerService: HeaderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.headerService.getProgressHeaderListener()
      .subscribe((progress)=> {
        this.isLoading = progress.loading;
      })

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
