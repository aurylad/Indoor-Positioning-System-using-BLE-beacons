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

  private log: Log[];
  private trackedObjects: TrackedObject[];
  private plan: Plan = {};
  private plans: Plan[];
  private logByPlanId: Log[];
  private logByObjectId: Log[];
  logByPlanAndObject: Log[] = [];

  private selectedObjectCode;

  img = new Image();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _apiService: ApiService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getLogs();

    this.getObjects();
    this.getPlans();
  }

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false,
    closeOnSelect: false
  };

  onDateSelect(event: Date){
    console.log(event.getMinutes() + "asds");
  }

  onObjectSelected(selectedObjectId) {
    this.selectedObjectCode = selectedObjectId.objectCode;
    this.getLogByObjectId(selectedObjectId.id);
  }

  // --------------------------------------------------IF PLAN SELECTED----------------------------------------------//
  onMapSelected(selectedPlanId) {
    this._apiService.getPlanById(selectedPlanId).subscribe((plan) => {
      console.log(selectedPlanId);
      
      this.img.onload = () => {
        this.canvas = <HTMLCanvasElement>document.getElementById("objectsRenderingCanvas");
        this.ctx = this.canvas.getContext("2d");
        console.log(this.ctx);

        this.canvas.width = plan.planWidth;
        this.canvas.height = plan.planHeight;
        this.ctx.drawImage(this.img, 0, 0);

        //Get all logs records by selected plan
        this.getLogByPlanId(selectedPlanId);

        //Event lisiner for movement simulation begin
        // let btn = document.getElementById("coolbutton");
        // btn.addEventListener("click", (e: Event) => this.movementSimulation(this.logByPlanId));
      }
      this.img.src = plan.planImage;
      this.plan = plan;
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida, bandykte dar kartą.");
    })

  }
  // --------------------------------------------------------------------------------------------------------------//


  trigger() {
    console.log("IŠSAUGOTI");

    this.logByPlanAndObject = [];
    this.logByPlanId.forEach(element => {
      if (element.objectId === this.selectedObjectCode) {
        this.logByPlanAndObject.push(element);
      }
    });
    console.log(this.logByPlanAndObject);
    console.log("Veikia");
    
    this.movementSimulation(this.logByPlanAndObject);
    // let btn = document.getElementById("start");
    // btn.addEventListener("click", (e: Event) => this.movementSimulation(this.logByPlanAndObject));
  }


  //Read array throw time interval and draw a circle on plan
  movementSimulation(logData) {
    console.log("TRIGGER");

    let a = 1                     //Test  
    var curNewsIndex = -1;
    var intervalID = setInterval(() => {
      ++curNewsIndex;
      if (curNewsIndex >= logData.length) {
        clearInterval(intervalID);
      } else {
        this.ctx.drawImage(this.img, 0, 0);
        this.ctx.beginPath();
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(logData[curNewsIndex].objectId, logData[curNewsIndex].coordinateX - 10, logData[curNewsIndex].coordinateY + 25);
        this.ctx.arc(logData[curNewsIndex].coordinateX, logData[curNewsIndex].coordinateY, 6, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.stroke();
        console.log(logData[curNewsIndex])       //Test
        console.log(a++);                        //Test
      }
    }, 200);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  getLogs() {
    this._apiService.getLog().subscribe((log) => {
      this.log = log
      console.log(this.log);
    }, (error) => {
      console.log(error);
    })
    return this.log;
  }

  getPlans() {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  getPlanById(planId: number) {
    this._apiService.getPlanById(planId).subscribe((plan) => {
      this.plan = plan
    }, (error) => {
      console.log(error);
    })
    return this.plan;
  }

  getLogByPlanId(logPlanId: number) {
    this._apiService.getLogByPlanId(logPlanId).subscribe((logByPlanId) => {
      this.logByPlanId = logByPlanId
    }, (error) => {
      console.log(error);
    })
    return this.logByPlanId;
  }

  getLogByObjectId(logObjectId: number) {
    this._apiService.getLogByObjectId(logObjectId).subscribe((logByObjectId) => {
      this.logByObjectId = logByObjectId
    }, (error) => {
      console.log(error);
    })
    return this.logByObjectId;
  }

  getObjects() {
    this._apiService.getObject().subscribe((trackedObjects) => {
      this.trackedObjects = trackedObjects
    }, (error) => {
      console.log(error);
    })
    return this.trackedObjects;
  }

}
