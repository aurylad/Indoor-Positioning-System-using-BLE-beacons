import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/services';
import { Plan, Log } from 'src/app/api/models';

@Component({
  selector: 'app-real-time-rendering',
  templateUrl: './real-time-rendering.component.html',
  styleUrls: ['./real-time-rendering.component.css']
})
export class RealTimeRenderingComponent implements OnInit {

  private plans: Plan[];
  private plan: Plan;
  private logs: Log[];

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  intervalID: any;
  intervalID2: any;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getPlans();
  }

  getPlans(): Plan[] {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  onMapSelected(selectedPlanId): void {
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
    if (this.plan !== undefined) {
      this._apiService.getLogByDatetime(this.plan.id).subscribe((log) => {
        this.logs = log;
        this.movementSimulation(this.logs);
      }, (error) => {
        console.log(error);
      })
    } else {
      alert("Pasirinkite planą.")
      this.stop();
    }
  }

  realTimeDataByIntervals() {
    this.intervalID = setInterval(() => {
      this.getRealTimeLogs();
    }, 3000);
  }

  stop() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalID2);
    this.logs = [];
  }

  movementSimulation(logData) {
    console.log(logData);
    
    var curNewsIndex = -1;
    if (logData !== null) {
      var intervalID = setInterval(() => {
        ++curNewsIndex;
        if (curNewsIndex >= logData.length) {
          clearInterval(intervalID);
        } else {
          console.log(1);
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
      }, 500);
    } else {
      console.log("No records found");
    }
  }

}
