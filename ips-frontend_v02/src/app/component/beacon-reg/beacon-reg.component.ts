import { Component, OnInit, ViewChild } from '@angular/core';
import { Beacon } from '../../api/models/beacon';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Plan, BeaconInPlan } from 'src/app/api/models';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-beacon-reg',
  templateUrl: './beacon-reg.component.html',
  styleUrls: ['./beacon-reg.component.css']
})
export class BeaconRegComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router) { }

  staticAlertClosed = false;
  successMessage: string;
  private _success = new Subject<string>();
  ngOnInit(): void {
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));
    this.getPlans();
    this.getBeacons();
    this.getBeaconsInPlan();
  }

  //--------------------- TAB - beacon reg in plan--------------------------


  private plan: Plan[];
  getPlans() {
    this._apiService.getPlan().subscribe((plans) => {
      this.plan = plans
    }, (error) => {
      console.log(error);
    })
  }


  private beacons: Beacon[];
  getBeacons() {
    this._apiService.getBeacon().subscribe((beacons) => {
      this.beacons = beacons
    }, (error) => {
      console.log(error);
    })
    return this.beacons;
  }

  private beaconsInPlan: BeaconInPlan[];
  getBeaconsInPlan() {
    this._apiService.getBeaconInPlan().subscribe((beaconsInPlan) => {
      this.beaconsInPlan = beaconsInPlan
    }, (error) => {
      console.log(error);
    })
    return this.beaconsInPlan;
  }

  private unusedBeaconsList: Beacon[] = [];
  getUnusedBeacons() {
    // this.getBeaconsInPlan()

    this.unusedBeaconsList = [];
    if (this.getBeaconsInPlan() !== null) {
      let unusedBeaconsIds = this.beacons.map(({ beaconId }) => beaconId).filter(item => this.beaconsInPlan.map(({ beaconId }) => beaconId).indexOf(item) < 0);
      for (let x = 0; x < this.beacons.length; x++) {
        for (let y = 0; y < unusedBeaconsIds.length; y++) {
          if (this.beacons[x].beaconId === unusedBeaconsIds[y]) {
            this.unusedBeaconsList.push(this.beacons[x]);
          }
        }
      }
    } else {
      for (let x = 0; x < this.beacons.length; x++) {
        this.unusedBeaconsList.push(this.beacons[x]);
      }
      console.log(this.unusedBeaconsList);
    }
  }


  private plans: Plan = {};
  img = new Image();
  onMapSelected(selectedPlanId) {
    this._apiService.getPlanById(selectedPlanId).subscribe((plan) => {
      this.img.onload = () => {
        const canvas = <HTMLCanvasElement>document.getElementById("beaconRegCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = plan.planWidth;
        canvas.height = plan.planHeight;
        ctx.drawImage(this.img, 0, 0);
      }
      this.img.src = plan.planImage;
      this.plans = plan;
      this.getUnusedBeacons()   //To fill list of avaliable beacons
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida.");
    })
  }


  displayedColumnsBeaconReg: string[] = ['select', 'id', 'beaconId'];
  displayedColumnsBeaconList: string[] = ['id', 'beaconId'];
  selection = new SelectionModel<Beacon>(true, []);
  PLACED_BEACON_DATA: Beacon[] = [];

  selectBeaconPlace(event) {
    if (this.img.src != "" && this.selection.selected.length != 0) {
      //For drawing                
      const canvas = <HTMLCanvasElement>document.getElementById("beaconRegCanvas");
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(this.selection.selected[this.selection.selected.length - 1].beaconId, x - 10, y + 25);
      ctx.arc(x, y, 9, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();

      //For coord saving
      const beaconInPlan = <BeaconInPlan>{
        beaconId: this.selection.selected[this.selection.selected.length - 1].beaconId,
        beaconCoordinateX: x,
        beaconCoordinateY: y,
        plandId: this.plans.planName
      }
      this.PLACED_BEACON_DATA.push(beaconInPlan);   //Making array from added beacons on plan
    }
  }

  saveBeacOnPlan() {
    if (this.PLACED_BEACON_DATA.length != 0) {
      this.PLACED_BEACON_DATA.forEach(element => {
        this._apiService.addBeaconInPlan(element).subscribe((placed_beacon) => {
          this.PLACED_BEACON_DATA = [];
          this._success.next(`Operacija atlikta sėkmingai!`);
          this.getUnusedBeacons() //To fill list of avaliable beacons
        }, (error) => {
          console.log(error);
          alert("Šis siųstuvas jau užregistruotas!")
        });
      });
    } else {
      alert("Nepasirinktas siųstuvas!");
    }
  }

  // ------------------------TAB - new beacon reg --------------------

  private formBeacon: Beacon = {};
  processBeaconRegForm() {
    if (this.formBeacon.beaconId != null) {
      this._apiService.addBeacon(this.formBeacon).subscribe((beacon) => {
        this._success.next(`Operacija atlikta sėkmingai!`);
        this.getBeacons();   //To refresh list of beacons in next tab
      }, (error) => {
        console.log(error);
        alert("Atsiprašome, įvyko klaida. Patikrinkite ar siųstuvas tokiu pavadinimu jau nėra užregistruotas.")
      });
    } else {
      alert("Atsiprašome, įvyko klaida. Patikrinkite ar siųstuvas tokiu pavadinimu jau nėra užregistruotas.")
    }
  }

}