import { Injectable } from '@angular/core';
import { TrackedObject } from '../models';
import { Beacon } from '../models/beacon';
import { BeaconInPlan } from '../models/beacon-in-plan';
import { RestrictedArea } from '../models/restricted-area';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class EditDataService {

  private object: TrackedObject;
  private beacon: Beacon;
  private beaconInPlan: BeaconInPlan;
  private restrictedArea: RestrictedArea;
  private plan: Plan;

  constructor() { }

  objectSetter(object: Object) {
    this.object = object;
  }

  objectGetter(): any {
    return this.object;
  }

  beaconSetter(beacon: Beacon) {
    this.beacon = beacon;
  }

  beaconGetter(): any {
    return this.beacon;
  }

  beaconInPlanSetter(beaconInPlan: BeaconInPlan) {
    this.beaconInPlan = beaconInPlan;
  }

  beaconInPlanGetter(): any {
    return this.beaconInPlan;
  }

  areaSetter(area: RestrictedArea) {
    this.restrictedArea = area;
  }

  areaGetter(): any {
    return this.restrictedArea;
  }

  planSetter(plan: Plan) {
    this.plan = plan;
  }

  planGetter(): any {
    return this.plan;
  }
}
