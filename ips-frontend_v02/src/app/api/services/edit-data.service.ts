import { Injectable } from '@angular/core';
import { TrackedObject } from '../models';
import { Beacon } from '../models/beacon';

@Injectable({
  providedIn: 'root'
})
export class EditDataService {

  private object: TrackedObject;
  private beacon: Beacon;

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
}
