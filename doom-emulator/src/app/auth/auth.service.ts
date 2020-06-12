import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from '../../environments/environment';

import { User } from "../user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user: User;

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  public getToken() {
    return this.token;
    // return localStorage.getItem("token");
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public getUser(){
    return this.user;
  }


  public createUser(name: string, password: string, email: string) {
    const authData = { name: name, password: password, email: email };
    return this.http
      .post(environment.apiUrl + "/auth/signup", authData)
  }

  public login(email: string, password: string) {
    const authData: any = { 
      email: email, 
      password: password
    };
    return this.http
      .post<{ token: string; expiresIn: number, userData }>(
        environment.apiUrl + "/auth/login",
        authData
      )
      .pipe(map((response) => {
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this._setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.token = token;
          this.user = {
            name: response.userData.name, 
            email: response.userData.email, 
            _id: response.userData.email, 
            isadmin: response.userData.isadmin
          };
          this._saveAuthData(token, expirationDate, this.user._id);

          this.authStatusListener.next(true);
        }
      }))
  }

  public logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = undefined;
    clearTimeout(this.tokenTimer);
    this._clearAuthData();
    this.router.navigate(["/auth"]);
  }
  public autoAuthUser() {
    const authInformation = this._getAuthData();
    if (!authInformation) {
      return new Observable((observer) => {});
    }


    
    this.token = authInformation.token;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn < 0) {
      console.log("TOKEN EXPIRED")
    }

    this.isAuthenticated = true;

    return this.http
      .get<{ token: string; expiresIn: number, userData }>(
        environment.apiUrl + "/auth/loginWithToken"
      )
      .pipe(map((response) => {
        this.isAuthenticated = true;
        this._setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
        this.user.email = response.userData.email;
        this.user.name = response.userData.name;
        this.user.isadmin = response.userData.isadmin;
        return response
      }))

  }

  private _setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private _saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private _clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiration");
  }

  private _getAuthData() {
    const token = localStorage.getItem("token");
    this.user = {
      _id: localStorage.getItem("userId")
    };
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
