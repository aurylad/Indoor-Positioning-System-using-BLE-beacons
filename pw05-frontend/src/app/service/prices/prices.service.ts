import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Price } from '../../components/prices/price'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private baseUrl: string = 'http://localhost:8080/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })
  private price: Price;
  constructor(private _http: Http) { }

  getPrices() {
    return this._http.get(this.baseUrl + '/prices', this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  getPrice(id: Number) {
    return this._http.get(this.baseUrl + '/prices/' + id, this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  deletePrice(id: Number) {
    return this._http.delete(this.baseUrl + '/prices/' + id, this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  updatePrice(price: Price) {
    return this._http.post(this.baseUrl + '/prices/', JSON.stringify(price), this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  addPrice(price: Price) {
    return this._http.put(this.baseUrl + '/prices/', JSON.stringify(price), this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return throwError(error);
  }

  setter(price: Price) {
    this.price = price;
  }

  getter() {
    return this.price;
  }
}
