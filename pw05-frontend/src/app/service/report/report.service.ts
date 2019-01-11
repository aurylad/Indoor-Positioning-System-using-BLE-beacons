import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl: string = 'http://localhost:8080/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })
  constructor(private _http: Http) { }

  getReport() {
    return this._http.get(this.baseUrl + '/Report', this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }
}

