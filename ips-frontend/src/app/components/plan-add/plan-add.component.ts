import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/api/models';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {

  private plan: Plan;

  indexForCoordToShow = 0;
  firstPointX;
  firstPointY;
  resultDistBetweenPoints;
  img = new Image();


  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
  }

  planListPage() {
    this._router.navigate(['/plan/list']);
  }

  imgUplaod() {
    const input = <HTMLInputElement>document.querySelector('input[type=file]');

    const reader = new FileReader();
    reader.onload = () => {
      // const img = new Image();
      this.img.onload = () => {
        const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = this.img.naturalWidth;
        canvas.height = this.img.naturalHeight;
        ctx.drawImage(this.img, 0, 0);
        console.log(this.img.naturalWidth);
        console.log(this.img.naturalHeight);
      }
      this.img.src = reader.result as string;
    }
    reader.readAsDataURL(input.files[0]);
  }

  getCursorPosition(event) {
    this.indexForCoordToShow++;
    const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();

    if (this.indexForCoordToShow == 2) {
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      this.firstPointX = x;
      this.firstPointY = y;

    } else if (this.indexForCoordToShow == 3) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;

      //Calculate distance between points
      var distBetweenX = this.firstPointX - x;
      var distBetweenY = this.firstPointY - y;
      if (Math.abs(distBetweenX) > Math.abs(distBetweenY)) {
        this.resultDistBetweenPoints = Math.abs(distBetweenX);
      } else {
        this.resultDistBetweenPoints = Math.abs(distBetweenY);
      }
      console.log(this.resultDistBetweenPoints);

    }

    //Draw circle on cicked place
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();

    //Clear plan, after third point
    if (this.indexForCoordToShow == 4) {
      this.imgUplaod();
      this.indexForCoordToShow = 1;
      alert("Pasirinkite taškus iš naujo.");
    }

  }

  measuringToolCheckBox() {
    let element = <HTMLInputElement>document.getElementById("myonoffswitch");
    if (element.checked) {
      (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = false;
      this.getCursorPosition(event)
    } else {
      (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
    }
  }

  processForm() {
    
    var planName = (<HTMLInputElement>document.getElementById("planName")).value;
    var distanceInCm = (<HTMLInputElement>document.getElementById("measureCheckBox")).value;
    var scale = +distanceInCm / this.resultDistBetweenPoints;

    // Create final object to send in server
    const planObj = <Plan>{
      planName: planName,
      planImage: this.img.src,
      // planImage: "sadfgh6fd5aesdf645gv6fhyg4srd6fc",
      planWidth: this.img.naturalWidth,
      planHeight: this.img.naturalHeight,
      planScale: +scale.toFixed(2)
    }

    this.plan = planObj;
    this._apiService.addPlan(this.plan).subscribe((plan) => {
      alert("Planas užregistruotas sėkmingai!")
      this.planListPage();
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida.")
    });
  }
}
