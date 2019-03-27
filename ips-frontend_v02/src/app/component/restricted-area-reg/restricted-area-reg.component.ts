import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/services';
import { Plan, TrackedObject } from 'src/app/api/models';

@Component({
  selector: 'app-restricted-area-reg',
  templateUrl: './restricted-area-reg.component.html',
  styleUrls: ['./restricted-area-reg.component.css']
})
export class RestrictedAreaRegComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  private plans: Plan[];
  private trackedObjects: TrackedObject[];
  private plan: Plan = {};

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  ngOnInit() {
    this.getObjects();
    this.getPlans();
  }


  onMapSelected(selectedPlanId) {
    this._apiService.getPlanById(selectedPlanId).subscribe((plan) => {
      this.img.onload = () => {
        this.canvas = <HTMLCanvasElement>document.getElementById("objectsRenderingCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = plan.planWidth;
        this.canvas.height = plan.planHeight;
        this.ctx.drawImage(this.img, 0, 0);
      }
      this.img.src = plan.planImage;
      this.plan = plan;
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida, bandykte dar kartą.");
    })

  }

  getPlans() {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  getObjects() {
    this._apiService.getObject().subscribe((trackedObjects) => {
      this.trackedObjects = trackedObjects
    }, (error) => {
      console.log(error);
    })
    return this.trackedObjects;
  }

  setRestrictedAreas(){
    s
  }

}
