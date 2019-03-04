import { Component, OnInit } from '@angular/core';
import { Beacon } from '../../api/models/beacon';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Plan } from 'src/app/api/models';
import { min } from 'd3';

@Component({
  selector: 'app-beacon-reg',
  templateUrl: './beacon-reg.component.html',
  styleUrls: ['./beacon-reg.component.css']
})
export class BeaconRegComponent implements OnInit {

  //For success alert
  staticAlertClosed = false;
  successMessage: string;
  private _success = new Subject<string>();

  //For forms
  private beacon: Beacon = {};
  private plan: Plan = {};
  // selectedItem: Number;

  //For services
  private beacons: Beacon[];
  private plans: Plan[];

  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));

    this.getPlans();
    this.getBeacons();
  }

  getPlans() {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans
      console.log(plans);
    }, (error) => {
      console.log(error);
    })
  }

  getBeacons() {
    this._apiService.getBeacon().subscribe((beacons) => {
      this.beacons = beacons
      console.log(this.beacons);
    }, (error) => {
      console.log(error);
    })
  }

  processBeaconRegForm() {
    if (this.beacon.beaconId != null) {
      this._apiService.addBeacon(this.beacon).subscribe((beacon) => {
        this._success.next(`Operacija atlikta sėkmingai!`);
        //To refresh list of beacons in next tab
        this.getBeacons();
      }, (error) => {
        console.log(error);
        alert("Atsiprašome, įvyko klaida. Patikrinkite ar siųstuvas tokiu pavadinimu jau nėra užregistruotas.")
      });
    } else {
      alert("Atsiprašome, įvyko klaida. Patikrinkite ar siųstuvas tokiu pavadinimu jau nėra užregistruotas.")
    }
  }
}


