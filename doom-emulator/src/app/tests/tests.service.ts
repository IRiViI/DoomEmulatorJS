import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(
      private http: HttpClient, 
      private router: Router) { }



  public createImage(data: any): Observable<any>{
    const formData = new FormData();
    formData.append("image", data.image)
    // formData.append("body", data)
    return this.http.post<any>(
        environment.apiUrl + '/tests/test',
        formData
      )

  };
}
