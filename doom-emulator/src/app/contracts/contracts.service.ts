import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(
      private http: HttpClient,) { }


  public getRandomContract(): Observable<any[]>{
    return this.http.get<any>(
        environment.apiUrl + '/contracts/contracts'
      )
      .pipe(map((result:any) => {
        if (result.hasOwnProperty('labels') && result.labels.length > 0){
          return result;
        }
        result.labels = [];
        for (let i = 0; i < result.paragraphs.length; i++){
          result.labels.push([]);
        }
        return result
      })
    )
  };

  public patchContract(contract): Observable<any[]>{
    return this.http.patch<any>(
      environment.apiUrl + '/contracts/contracts',
      contract
    )
  };
}
