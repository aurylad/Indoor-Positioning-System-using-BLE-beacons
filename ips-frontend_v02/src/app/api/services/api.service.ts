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
   * @param planId Numeric ID of the plan to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByPlanIdResponse(planId: string): __Observable<__StrictHttpResponse<Log>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/${planId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Log>;
      })
    );
  }
  /**
   * @param planId Numeric ID of the plan to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByPlanId(planId: string): __Observable<Log> {
    return this.getLogByPlanIdResponse(planId).pipe(
      __map(_r => _r.body as Log)
    );
  }

  /**
   * @param objectID Numeric ID of the object to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByObjectIdResponse(objectID: string): __Observable<__StrictHttpResponse<Log>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/object/${objectID}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Log>;
      })
    );
  }
  /**
   * @param objectID Numeric ID of the object to get log data.
   * @return Successful response, with a representation of plan.
   */
  getLogByObjectId(objectID: string): __Observable<Log> {
    return this.getLogByObjectIdResponse(objectID).pipe(
      __map(_r => _r.body as Log)
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
  addBeaconResponse(beacon?: Beacon): __Observable<__StrictHttpResponse<null>> {
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
  addBeacon(beacon?: Beacon): __Observable<null> {
    return this.addBeaconResponse(beacon).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param beacon undefined
   */
  updateBeaconResponse(beacon?: Beacon): __Observable<__StrictHttpResponse<null>> {
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
  updateBeacon(beacon?: Beacon): __Observable<null> {
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
}

module ApiService {
}

export { ApiService }
