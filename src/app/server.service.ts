import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  hostAddress = 'http://localhost:8000/'

  constructor(private http:HttpClient) { }

  postData(url: any, data: any) {
    // const header = new HttpHeaders({})
    return this.http.post(this.hostAddress + url, data).pipe(map((response:any) => {
      return response;
    }),
      catchError((error) => {
        return observableThrowError('someting went wrong');
      }));
  }
  getData(url: any) {
    return this.http.get(this.hostAddress + url).pipe(map((response:any) => {
      return response;
    }),
      catchError((error) => {
      return observableThrowError('something webt wrong')
    }))
  }
}
