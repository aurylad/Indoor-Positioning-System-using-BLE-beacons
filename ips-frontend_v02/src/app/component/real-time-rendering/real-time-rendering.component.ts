import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/services';
import { Plan, Log, TrackedObject } from 'src/app/api/models';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-real-time-rendering',
  templateUrl: './real-time-rendering.component.html',
  styleUrls: ['./real-time-rendering.component.css']
})
export class RealTimeRenderingComponent implements OnInit {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  private plans: Plan[];
  private plan: Plan;
  private findedObjectData: Log[] = [];
  private objects: TrackedObject[];
  private selectedObject: TrackedObject;

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  intervalID: any;
  curNewsIndex: any;
  resourcesLoaded = false;
  dataReceived = false;
  theSameHeightDiv = false;

  planPicDiv: any;

  displayedColumns: string[] = ['objectId', 'objectName', 'objectAccessLevel', 'planId'];
  private data: Log[] = [];
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));

    this.planPicDiv = document.getElementById("planPicDiv");

    this.getPlans();
    this.getObjects();
    this.stop();
  }

  getPlans(): Plan[] {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans;
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

  find() {
    this.dataReceived = false;
    this.theSameHeightDiv = false;
    this.resourcesLoaded = true;
    this.findedObjectData = [];
    this.data = [];
    var curNewsIndex = 0;

    var intervalID2 = setInterval(() => {
      ++curNewsIndex;
      if (curNewsIndex >= 5) {
        clearInterval(intervalID2);
        this.resourcesLoaded = false;
        this._success.next(`Šiuo metu objektas nėra aktyvus.`);
      } else {
        this._apiService.getLogByDatetime(1).subscribe((log) => {
          if (log !== null) {
            for (let index = 0; index < log.length; index++) {
              if (log[index].objectName == this.selectedObject.objectName) {
                this.findedObjectData.push(log[index]);
                clearInterval(intervalID2);
                this.data = this.findedObjectData;
                this.dataReceived = true;
                this.resourcesLoaded = false;
                this.theSameHeightDiv = true;
              }
              break;
            }
          }
        }, (error) => {
          console.log(error);
        })
      }
    }, 1000);
  }

  onObjectSelected(selectedObject): void {
    this.selectedObject = selectedObject;
  }

  onMapSelected(selectedPlanId): void {
    if (selectedPlanId == undefined) {
      if (this.planPicDiv.style.display === "block") {
        this.planPicDiv.style.display = "none";
      }
    } else {
      this._apiService.getPlanById(selectedPlanId).subscribe((plan) => {
        this.img.onload = () => {
          this.canvas = <HTMLCanvasElement>document.getElementById("objectsRenderingCanvas");
          this.ctx = this.canvas.getContext("2d");
          this.canvas.width = plan.planWidth;
          this.canvas.height = plan.planHeight;
          this.ctx.drawImage(this.img, 0, 0);
          if (this.planPicDiv.style.display === "none") {
            this.planPicDiv.style.display = "block";
          }
        }
        this.img.src = plan.planImage;
        this.plan = plan;
      }, (error) => {
        console.log(error);
        alert("Atsiprašome, ivyko klaida, bandykte dar karta.");
      })
    }
  }

  //get logs which related with selected plan and are not oldest than 3 sec  
  getRealTimeLogs(): any {
    if (this.plan !== undefined) {
      this._apiService.getLogByDatetime(1).subscribe((log) => {
        if (log !== null) {
          log.forEach(element => {
            if (this.plan.planName == element.planId) {
              this.ctx.drawImage(this.img, 0, 0);
              this.ctx.beginPath();
              this.ctx.font = "16px Arial";
              this.ctx.fillStyle = "black";
              this.ctx.fillText(element.objectId, element.coordinateX - 10, element.coordinateY + 25);
              this.ctx.arc(element.coordinateX, element.coordinateY, 6, 0, 2 * Math.PI);
              this.ctx.fillStyle = "red";
              this.ctx.fill();
              this.ctx.stroke();
            }
          });
        }
        console.log(log);
      }, (error) => {
        console.log(error);
      })
    } else {
      alert("Pasirinkite plana.")
      this.stop();
    }
  }

  realTimeDataByIntervals() {
    this._success.next(`Gaunami duomenys... Stebėjimas sėkmingai pradėtas.`);
    this.intervalID = setInterval(() => {
      this.getRealTimeLogs();
    }, 1000);
  }

  start() {
    this.realTimeDataByIntervals();
  }

  stop() {
    if (this.plan !== undefined) {
      this.img.src = this.plan.planImage;
      this._success.next(`Stebėjimas sėkmingai nutrauktas.`);
    }
    clearInterval(this.intervalID);
  }

}

