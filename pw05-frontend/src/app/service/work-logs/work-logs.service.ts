import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { WorkLog } from '../../components/work-logs/work-log'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkLogsService {

  private baseUrl: string = 'http://localhost:8080/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })
  private workLog: WorkLog;
  constructor(private _http: Http) { }

  getWorkLogs() {
    return this._http.get(this.baseUrl + '/work-logs', this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  getWorkLog(id: Number) {
    return this._http.get(this.baseUrl + '/work-logs/' + id, this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  deleteWorkLog(id: Number) {
    return this._http.delete(this.baseUrl + '/work-logs/' + id, this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  updateWorkLog(workLog: WorkLog) {
    return this._http.post(this.baseUrl + '/work-logs/', JSON.stringify(workLog), this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  addWorkLog(workLog: WorkLog) {
    return this._http.put(this.baseUrl + '/work-logs/', JSON.stringify(workLog), this.options).pipe(map((response: Response) => response.json())).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: Response) {
    return throwError(error);
  }

  setter(workLog: WorkLog) {
    this.workLog = workLog;
  }

  getter() {
    return this.workLog;
  }

}
