import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/services';
import { Plan, TrackedObject, RestrictedArea } from 'src/app/api/models';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';


export interface DrawingPoints {
  x: number,
  y: number
}

@Component({
  selector: 'app-restricted-area-reg',
  templateUrl: './restricted-area-reg.component.html',
  styleUrls: ['./restricted-area-reg.component.css']
})


export class RestrictedAreaRegComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  staticAlertClosed = false;
  successMessage: string;
  private _success = new Subject<string>();

  private plans: Plan[];
  private trackedObjects: TrackedObject[];
  private plan: Plan = {};
  drawingPoints: DrawingPoints[] = [];
  areaCoordinates;  //Object

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  index = 0;
  arrIndex = 0;

  ngOnInit() {
    this.getObjects();
    this.getPlans();

    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));
  }


  onMapSelected(selectedPlanId) {
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


  drawRestrictedAreas(event) {
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "red";

    if (this.index == 0) {
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.drawingPoints[this.arrIndex] = { "x": x, "y": y }
    }
    this.index++;

    //For drawing with mouse
    if (this.index !== 1 && this.index !== 0 && this.index < 8) {
      this.arrIndex++
      this.drawingPoints[this.arrIndex] = { "x": x, "y": y }
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(this.drawingPoints[this.arrIndex - 1].x, this.drawingPoints[this.arrIndex - 1].y)
      this.ctx.stroke();
      this.index++;
    }

    if (this.index == 7) {
      //For autocomplete last line
      this.ctx.moveTo(this.drawingPoints[0].x, this.drawingPoints[0].y);
      this.ctx.lineTo(this.drawingPoints[1].x, this.drawingPoints[1].y);
      this.ctx.lineTo(this.drawingPoints[2].x, this.drawingPoints[2].y);
      this.ctx.lineTo(x, y);
      this.ctx.closePath();
      this.ctx.stroke();
      this.fillAreaBackground()
    }
  }

  //For fill area background and make final object for area coordinates
  fillAreaBackground() {
    let x = [];
    let y = [];

    for (let i = 0; i < this.drawingPoints.length; i++) {
      x.push(this.drawingPoints[i].x);
      y.push(this.drawingPoints[i].y);
    }

    let minX = Math.min(...x);
    let maxX = Math.max(...x);

    let minY = Math.min(...y);
    let maxY = Math.max(...y);

    this.areaCoordinates = {
      topLeftCoordX: minX,
      topLeftCoordY: minY,
      topRightCoordX: maxX,
      topRightCoordY: minY,
      bottomLeftCoordX: minX,
      bottomLeftCoordY: maxY,
      bottomRightCoordX: maxX,
      bottomRightCoordY: maxY
    };

    var strokeLenght = this.areaCoordinates.topRightCoordX - this.areaCoordinates.topLeftCoordX //X
    var strokeWidth = this.areaCoordinates.bottomRightCoordY - this.areaCoordinates.topRightCoordY //Y
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.areaCoordinates.topLeftCoordX, this.areaCoordinates.topLeftCoordY, strokeLenght, strokeWidth);
  }

  save(areaForm: NgForm): void {
    if (this.areaCoordinates == null) {
      alert("Tinkamai pažymėkite zoną!")
    } else {
      const restrictedAreaInfo = <RestrictedArea>{
        topLeftCoordY: this.areaCoordinates.topLeftCoordY,
        topRightCoordX: this.areaCoordinates.topRightCoordX,
        topRightCoordY: this.areaCoordinates.topRightCoordY,
        topLeftCoordX: this.areaCoordinates.topLeftCoordX,
        bottomRightCoordX: this.areaCoordinates.bottomRightCoordX,
        bottomRightCoordY: this.areaCoordinates.bottomRightCoordY,
        bottomLeftCoordY: this.areaCoordinates.bottomLeftCoordY,
        bottomLeftCoordX: this.areaCoordinates.bottomLeftCoordX,
        planId: this.plan.planName,
        restrictedAreaName: areaForm.value.areaName,
        accessLevel: areaForm.value.objectAccessLevel
      }

      if ((areaForm.value.planName, areaForm.value.areaName, areaForm.value.objectAccessLevel) !== "") {

        this._apiService.addRestrictedArea(restrictedAreaInfo).subscribe((restrictedAreaInfo) => {
          this._success.next(`Operacija atlikta sėkmingai!`);
        }, (error) => {
          console.log(error);
          alert("Ši zona jau užregistruota!")
        });
      } else {
        alert("Užpildykite visus laukus.");
      }
    }
  }

  reset() {
    this.ctx.canvas.width = this.ctx.canvas.width;
    this.ctx.drawImage(this.img, 0, 0);
    this.drawingPoints = [];
    this.index = 0;
    this.arrIndex = 0;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
  }
}

