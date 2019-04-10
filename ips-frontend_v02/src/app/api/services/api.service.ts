/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DeviceData } from '../models/device-data';
import { Plan } from '../models/plan';
import { Log } from '../models/log';
import { Beacon } from '../models/beacon';
import { BeaconInPlan } from '../models/beacon-in-plan';
import { TrackedObject } from '../models/tracked-object';
import { Violations } from '../models/violations';
import { RestrictedArea } from '../models/restricted-area';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param deviceData undefined
   */
  addDeviceDataResponse(deviceData?: DeviceData): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = deviceData;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/device-data`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param deviceData undefined
   */
  addDeviceData(deviceData?: DeviceData): __Observable<null> {
    return this.addDeviceDataResponse(deviceData).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @return Successful response, with a representation of the plan data.
   */
  getPlanResponse(): __Observable<__StrictHttpResponse<Array<Plan>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Plan>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the plan data.
   */
  getPlan(): __Observable<Array<Plan>> {
    return this.getPlanResponse().pipe(
      __map(_r => _r.body as Array<Plan>)
    );
  }

  /**
   * @param plan undefined
   */
  addPlanResponse(plan?: Plan): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = plan;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param plan undefined
   */
  addPlan(plan?: Plan): __Observable<null> {
    return this.addPlanResponse(plan).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param plan undefined
   */
  updatePlanResponse(plan?: Plan): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = plan;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param plan undefined
   */
  updatePlan(plan?: Plan): __Observable<null> {
    return this.updatePlanResponse(plan).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the plan to delete.
   */
  deletePlanResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/plan/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id Numeric ID of the plan to delete.
   */
  deletePlan(id: number): __Observable<null> {
    return this.deletePlanResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the plan to get.
   * @return Successful response, with a representation of plan.
   */
  getPlanByIdResponse(id: number): __Observable<__StrictHttpResponse<Plan>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plan/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Plan>;
      })
    );
  }
  /**
   * @param id Numeric ID of the plan to get.
   * @return Successful response, with a representation of plan.
   */
  getPlanById(id: number): __Observable<Plan> {
    return this.getPlanByIdResponse(id).pipe(
      __map(_r => _r.body as Plan)
    );
  }

  /**
   * @param planId Name of the plan to get.
   * @return Successful response, with a representation of plan.
   */
  getPlanByPlanNameResponse(planId: string): __Observable<__StrictHttpResponse<Plan>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plan/name/${planId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Plan>;
      })
    );
  }
  /**
   * @param planId Name of the plan to get.
   * @return Successful response, with a representation of plan.
   */
  getPlanByPlanName(planId: string): __Observable<Plan> {
    return this.getPlanByPlanNameResponse(planId).pipe(
      __map(_r => _r.body as Plan)
    );
  }

  /**
   * @return Successful response, with a representation of the log data.
   */
  getLogResponse(): __Observable<__StrictHttpResponse<Array<Log>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Log>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the log data.
   */
  getLog(): __Observable<Array<Log>> {
    return this.getLogResponse().pipe(
      __map(_r => _r.body as Array<Log>)
    );
  }

  /**
   * @param id Numeric ID of the plan to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByPlanIdResponse(id: number): __Observable<__StrictHttpResponse<Array<Log>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Log>>;
      })
    );
  }
  /**
   * @param id Numeric ID of the plan to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByPlanId(id: number): __Observable<Array<Log>> {
    return this.getLogByPlanIdResponse(id).pipe(
      __map(_r => _r.body as Array<Log>)
    );
  }

  /**
   * @param id Numeric ID of the object to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByObjectIdResponse(id: number): __Observable<__StrictHttpResponse<Array<Log>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/object/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Log>>;
      })
    );
  }
  /**
   * @param id Numeric ID of the object to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByObjectId(id: number): __Observable<Array<Log>> {
    return this.getLogByObjectIdResponse(id).pipe(
      __map(_r => _r.body as Array<Log>)
    );
  }

  /**
   * @param planId Datetime of the log to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByDatetimeResponse(planId: number): __Observable<__StrictHttpResponse<Array<Log>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/real-time/${planId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Log>>;
      })
    );
  }
  /**
   * @param planId Datetime of the log to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByDatetime(planId: number): __Observable<Array<Log>> {
    return this.getLogByDatetimeResponse(planId).pipe(
      __map(_r => _r.body as Array<Log>)
    );
  }

  /**
   * @param params The `ApiService.GetLogByTimeIntervalParams` containing the following parameters:
   *
   * - `startDate`: Time intevrals to get log data.
   *
   * - `planId`: Time intevrals to get log data.
   *
   * - `objectId`: Time intevrals to get log data.
   *
   * - `endDate`: Time intevrals to get log data.
   *
   * @return Successful response, with a representation of plan.
   */
  getLogByTimeIntervalResponse(params: ApiService.GetLogByTimeIntervalParams): __Observable<__StrictHttpResponse<Array<Log>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;




    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/time-interval/${params.planId}/${params.objectId}/${params.startDate}/${params.endDate}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Log>>;
      })
    );
  }
  /**
   * @param params The `ApiService.GetLogByTimeIntervalParams` containing the following parameters:
   *
   * - `startDate`: Time intevrals to get log data.
   *
   * - `planId`: Time intevrals to get log data.
   *
   * - `objectId`: Time intevrals to get log data.
   *
   * - `endDate`: Time intevrals to get log data.
   *
   * @return Successful response, with a representation of plan.
   */
  getLogByTimeInterval(params: ApiService.GetLogByTimeIntervalParams): __Observable<Array<Log>> {
    return this.getLogByTimeIntervalResponse(params).pipe(
      __map(_r => _r.body as Array<Log>)
    );
  }

  /**
   * @return Successful response, with a representation of the beacon data.
   */
  getBeaconResponse(): __Observable<__StrictHttpResponse<Array<Beacon>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/beacon`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Beacon>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the beacon data.
   */
  getBeacon(): __Observable<Array<Beacon>> {
    return this.getBeaconResponse().pipe(
      __map(_r => _r.body as Array<Beacon>)
    );
  }

  /**
   * @param beacon undefined
   */
  addBeaconResponse(beacon: Beacon): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = beacon;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/beacon`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param beacon undefined
   */
  addBeacon(beacon: Beacon): __Observable<null> {
    return this.addBeaconResponse(beacon).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param beacon undefined
   */
  updateBeaconResponse(beacon: Beacon): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = beacon;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/beacon`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param beacon undefined
   */
  updateBeacon(beacon: Beacon): __Observable<null> {
    return this.updateBeaconResponse(beacon).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the beacon to delete.
   */
  deleteBeaconResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/beacon/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id Numeric ID of the beacon to delete.
   */
  deleteBeacon(id: number): __Observable<null> {
    return this.deleteBeaconResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the beacon to get.
   * @return Successful response, with a representation of beacon.
   */
  getBeaconByIdResponse(id: number): __Observable<__StrictHttpResponse<Beacon>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/beacon/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Beacon>;
      })
    );
  }
  /**
   * @param id Numeric ID of the beacon to get.
   * @return Successful response, with a representation of beacon.
   */
  getBeaconById(id: number): __Observable<Beacon> {
    return this.getBeaconByIdResponse(id).pipe(
      __map(_r => _r.body as Beacon)
    );
  }

  /**
   * @return Successful response, with a representation of the beacon in plan data.
   */
  getBeaconInPlanResponse(): __Observable<__StrictHttpResponse<Array<BeaconInPlan>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/beacon-in-plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<BeaconInPlan>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the beacon in plan data.
   */
  getBeaconInPlan(): __Observable<Array<BeaconInPlan>> {
    return this.getBeaconInPlanResponse().pipe(
      __map(_r => _r.body as Array<BeaconInPlan>)
    );
  }

  /**
   * @param beaconInPlan undefined
   */
  addBeaconInPlanResponse(beaconInPlan?: BeaconInPlan): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = beaconInPlan;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/beacon-in-plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param beaconInPlan undefined
   */
  addBeaconInPlan(beaconInPlan?: BeaconInPlan): __Observable<null> {
    return this.addBeaconInPlanResponse(beaconInPlan).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param beaconInPlan undefined
   */
  updateBeaconInPlanResponse(beaconInPlan?: BeaconInPlan): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = beaconInPlan;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/beacon-in-plan`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param beaconInPlan undefined
   */
  updateBeaconInPlan(beaconInPlan?: BeaconInPlan): __Observable<null> {
    return this.updateBeaconInPlanResponse(beaconInPlan).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the beacon in plan to delete.
   */
  deleteBeaconInPlanResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/beacon-in-plan/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id Numeric ID of the beacon in plan to delete.
   */
  deleteBeaconInPlan(id: number): __Observable<null> {
    return this.deleteBeaconInPlanResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the beacon in plan to get.
   * @return Successful response, with a representation of beacon in plan.
   */
  getBeaconInPlanByIdResponse(id: number): __Observable<__StrictHttpResponse<BeaconInPlan>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/beacon-in-plan/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BeaconInPlan>;
      })
    );
  }
  /**
   * @param id Numeric ID of the beacon in plan to get.
   * @return Successful response, with a representation of beacon in plan.
   */
  getBeaconInPlanById(id: number): __Observable<BeaconInPlan> {
    return this.getBeaconInPlanByIdResponse(id).pipe(
      __map(_r => _r.body as BeaconInPlan)
    );
  }

  /**
   * @return Successful response, with a representation of the object data.
   */
  getObjectResponse(): __Observable<__StrictHttpResponse<Array<TrackedObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tracked-object`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TrackedObject>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the object data.
   */
  getObject(): __Observable<Array<TrackedObject>> {
    return this.getObjectResponse().pipe(
      __map(_r => _r.body as Array<TrackedObject>)
    );
  }

  /**
   * @param object undefined
   */
  addObjectResponse(object?: TrackedObject): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = object;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tracked-object`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param object undefined
   */
  addObject(object?: TrackedObject): __Observable<null> {
    return this.addObjectResponse(object).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param object undefined
   */
  updateObjectResponse(object?: TrackedObject): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = object;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tracked-object`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param object undefined
   */
  updateObject(object?: TrackedObject): __Observable<null> {
    return this.updateObjectResponse(object).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the object to delete.
   */
  deleteObjectResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tracked-object/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id Numeric ID of the object to delete.
   */
  deleteObject(id: number): __Observable<null> {
    return this.deleteObjectResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the object to get.
   * @return Successful response, with a representation of object.
   */
  getObjectByIdResponse(id: number): __Observable<__StrictHttpResponse<TrackedObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tracked-object/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TrackedObject>;
      })
    );
  }
  /**
   * @param id Numeric ID of the object to get.
   * @return Successful response, with a representation of object.
   */
  getObjectById(id: number): __Observable<TrackedObject> {
    return this.getObjectByIdResponse(id).pipe(
      __map(_r => _r.body as TrackedObject)
    );
  }

  /**
   * @return Successful response, with a representation of the violations data.
   */
  getViolationResponse(): __Observable<__StrictHttpResponse<Array<Violations>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/violations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Violations>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of the violations data.
   */
  getViolation(): __Observable<Array<Violations>> {
    return this.getViolationResponse().pipe(
      __map(_r => _r.body as Array<Violations>)
    );
  }

  /**
   * @return Successful response, with a representation of restricted area data.
   */
  getRestrictedAreaResponse(): __Observable<__StrictHttpResponse<Array<RestrictedArea>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/restricted-area`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<RestrictedArea>>;
      })
    );
  }
  /**
   * @return Successful response, with a representation of restricted area data.
   */
  getRestrictedArea(): __Observable<Array<RestrictedArea>> {
    return this.getRestrictedAreaResponse().pipe(
      __map(_r => _r.body as Array<RestrictedArea>)
    );
  }

  /**
   * @param object undefined
   */
  addRestrictedAreaResponse(object?: RestrictedArea): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = object;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/restricted-area`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param object undefined
   */
  addRestrictedArea(object?: RestrictedArea): __Observable<null> {
    return this.addRestrictedAreaResponse(object).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param object undefined
   */
  updateRestrictedAreaResponse(object?: RestrictedArea): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = object;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/restricted-area`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param object undefined
   */
  updateRestrictedArea(object?: RestrictedArea): __Observable<null> {
    return this.updateRestrictedAreaResponse(object).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the restricted area to delete.
   */
  deleteRestrictedAreaResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/restricted-area/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id Numeric ID of the restricted area to delete.
   */
  deleteRestrictedArea(id: number): __Observable<null> {
    return this.deleteRestrictedAreaResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Numeric ID of the object to get.
   * @return Successful response, with a representation of restricted area.
   */
  getRestrictedAreaByIdResponse(id: number): __Observable<__StrictHttpResponse<RestrictedArea>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/restricted-area/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestrictedArea>;
      })
    );
  }
  /**
   * @param id Numeric ID of the object to get.
   * @return Successful response, with a representation of restricted area.
   */
  getRestrictedAreaById(id: number): __Observable<RestrictedArea> {
    return this.getRestrictedAreaByIdResponse(id).pipe(
      __map(_r => _r.body as RestrictedArea)
    );
  }
}

module ApiService {

  /**
   * Parameters for getLogByTimeInterval
   */
  export interface GetLogByTimeIntervalParams {

    /**
     * Time intevrals to get log data.
     */
    startDate: string;

    /**
     * Time intevrals to get log data.
     */
    planId: number;

    /**
     * Time intevrals to get log data.
     */
    objectId: number;

    /**
     * Time intevrals to get log data.
     */
    endDate: string;
  }
}

export { ApiService }
