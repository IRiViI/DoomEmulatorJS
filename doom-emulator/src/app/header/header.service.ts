import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public headerSubject = new Subject<{loading:boolean, value: number}>();

  constructor() {
  }

  public getProgressHeaderListener(){
    return this.headerSubject.asObservable();
  }
}
