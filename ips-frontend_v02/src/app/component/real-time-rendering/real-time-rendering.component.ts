import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/services';
import { Plan, Log, TrackedObject } from 'src/app/api/models';

@Component({
  selector: 'app-real-time-rendering',
  templateUrl: './real-time-rendering.component.html',
  styleUrls: ['./real-time-rendering.component.css']
})
export class RealTimeRenderingComponent implements OnInit {

  private plans: Plan[];
  private plan: Plan;
  private logs: Log[];

  private objects: TrackedObject[];

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  intervalID: any;
  intervalID2: any;

  private checkPlan = false;
  private checkObject = false;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getPlans();
    this.getObjects();
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

  onObjectSelected(selectedObject) {
    this.checkObject = true;
  }

  onMapSelected(selectedPlanId): void {
    this.checkPlan = true;
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
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida, bandykte dar kartą.");
    })
  }

  //get logs which related with selected plan and are not oldest than 10 sec  
  getRealTimeLogs(): any {
    this._apiService.getLogByDatetime(456).subscribe((log) => {
      this.logs = log;
      if (this.checkPlan && !(this.checkObject)) {
        this.movementSimulation(log);
      }
      if (this.checkObject) {
        this.movementSimulationWithoutPlan(log);
      }
    }, (error) => {
      console.log(error);
    })
  }

  realTimeDataByIntervals() {
    this.intervalID = setInterval(() => {
      this.getRealTimeLogs();
      console.log("INTERVAL");

    }, 3000);
  }

  movementSimulation(logData) {
    console.log("FROM WITH PLAN>");
    console.log(logData);

    var curNewsIndex = -1;
    if (logData !== null) {
      this.intervalID2 = setInterval(() => {
        ++curNewsIndex;
        if (curNewsIndex >= logData.length) {
          clearInterval(this.intervalID2);
        } else {
          if (logData[curNewsIndex].planId == this.plan.planName) {
            this.ctx.drawImage(this.img, 0, 0);
            this.ctx.beginPath();
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(logData[curNewsIndex].objectId, logData[curNewsIndex].coordinateX - 10, logData[curNewsIndex].coordinateY + 25);
            this.ctx.arc(logData[curNewsIndex].coordinateX, logData[curNewsIndex].coordinateY, 6, 0, 2 * Math.PI);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.stroke();
          } else {

          }
        }
      }, 1);
    } else {
      console.log("No records found");
    }
  }

  movementSimulationWithoutPlan(logData) {
    console.log("FROM WTHOUT PLAN>");
    console.log(logData);

    var curNewsIndex = -1;
    if (logData !== null) {
      this.intervalID2 = setInterval(() => {
        ++curNewsIndex;
        if (curNewsIndex >= logData.length) {
          clearInterval(this.intervalID2);
        } else {
          //For find a map and load by log
          this._apiService.getPlanByPlanName(logData[curNewsIndex].planId).subscribe((plan) => {
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
          }, (error) => {
            console.log(error);
          })
          //For moving simulation
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
      }, 1);
    } else {
      console.log("No records found");
    }
  }

  start() {
    this.realTimeDataByIntervals();
  }

  stop() {
    console.log("STOP");
    if (this.checkPlan) {
      this.img.src = this.plan.planImage;
    }
    clearInterval(this.intervalID);
    clearInterval(this.intervalID2);
    this.logs = [];
  }

  clear() {

  }

}
