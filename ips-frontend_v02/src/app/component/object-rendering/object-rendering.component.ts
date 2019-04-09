import { Component, OnInit } from '@angular/core';
import { Log, Plan, TrackedObject } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-object-rendering',
  templateUrl: './object-rendering.component.html',
  styleUrls: ['./object-rendering.component.css']
})
export class ObjectRenderingComponent implements OnInit {

  intervalID;

  private plans: Plan[];
  private plan: Plan;
  private objects: TrackedObject[];
  private logs: Log[];
  private logsByObject: Log[] = [];
  private checkMap = false;
  private checkObject = false;
  private selectedObject;
  private startDate: Date;
  private endDate: Date;

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getPlans();
    this.getObjects();
    // this.getLogsByTimeInterval();
  }

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false,
    closeOnSelect: false
  };

  onStartDateSelect(event) {
    this.startDate = new Date(event);
  }

  onEndDateSelect(event: Date) {
    this.endDate = new Date(event);
  }

  onObjectSelected(selectedObjectId) {
    this.checkObject = true;
    this.selectedObject = selectedObjectId;
    this.filterForLogsByObject(selectedObjectId);
  }

  onMapSelected(selectedPlanId): void {
    this.checkMap = true;
    this._apiService.getPlanById(selectedPlanId).subscribe((plan) => {
      this.img.onload = () => {
        this.canvas = <HTMLCanvasElement>document.getElementById("objectsRenderingCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = plan.planWidth;
        this.canvas.height = plan.planHeight;
        this.ctx.drawImage(this.img, 0, 0);
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        }
      }
      this.img.src = plan.planImage;
      this.plan = plan;
      this.getLogsByPlan();
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida, bandykte dar kartą.");
    })
  }

  getPlans(): Plan[] {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  getObjects(): TrackedObject[] {
    this._apiService.getObject().subscribe((objects) => {
      this.objects = objects;
    }, (error) => {
      console.log(error);
    })
    return this.objects;
  }

  getLogsByPlan() {
    this._apiService.getLogByPlanId(this.plan.id).subscribe((logs) => {
      this.logs = logs;
      console.log(logs);
    }, (error) => {
      console.log(error);
    })
  }

  movementSimulation(logData) {
    var curNewsIndex = -1;
    if (logData !== null) {
      this.intervalID = setInterval(() => {
        ++curNewsIndex;
        if (curNewsIndex >= logData.length) {
          clearInterval(this.intervalID);
          this.img.src = this.plan.planImage;
        } else {
          console.log("testing");
          this.ctx.drawImage(this.img, 0, 0);
          this.ctx.beginPath();
          this.ctx.font = "16px Arial";
          this.ctx.fillStyle = "black";
          this.ctx.fillText(logData[curNewsIndex].objectId, logData[curNewsIndex].coordinateX - 10, logData[curNewsIndex].coordinateY + 25);
          this.ctx.arc(logData[curNewsIndex].coordinateX, logData[curNewsIndex].coordinateY, 6, 0, 2 * Math.PI);
          this.ctx.fillStyle = "red";
          this.ctx.fill();
          this.ctx.stroke();
        }
      }, 100);
    } else {
      console.log("No records found");
    }
  }

  filterForLogsByObject(selectedObject: TrackedObject) {
    if (this.plan !== undefined) {
      this.logsByObject = [];
      this.logs.forEach(element => {
        if (element.objectId === selectedObject.objectCode) {
          this.logsByObject.push(element);
        }
      });
    } else {
      alert("Pirmiau pasirinkite planą!");
    }
    console.log(this.logsByObject);
  }

  getLogsByTimeInterval() {
    var data = { planId: 1, objectId: 2, startDate: this.startDate + "", endDate: this.endDate + "" };
    this._apiService.getLogByTimeInterval(data).subscribe((interval) => {
      console.log(interval);
    }, (error) => {
      console.log(error);
    })
  }

  start() {
    if (this.checkMap) {
      if (this.checkObject) {
        this.movementSimulation(this.logsByObject);
      } else {
        this.movementSimulation(this.logs);
      }
    } else {
      alert("Pasirinkite planą!");
    }
  }

  startByInterval() {
    var x = document.getElementById("myDIV2");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  stop() {
    clearInterval(this.intervalID);
    this.img.src = this.plan.planImage;
    // this.logs = [];
    // this.logsByObject = [];
  }

}
