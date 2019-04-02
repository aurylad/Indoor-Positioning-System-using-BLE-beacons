import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/api/models';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-plan-upload',
  templateUrl: './plan-upload.component.html',
  styleUrls: ['./plan-upload.component.css']
})
export class NgbdplanUploadBasicComponent implements OnInit {

  private plan: Plan;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  indexForCoordToShow = 0;
  firstPointX;
  firstPointY;
  secondPointX;
  secondPointY;
  resultDistBetweenPoints;
  img = new Image();


  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));
  }

  // planListPage() {
  //   this._router.navigate(['/plan/list']);
  // }

  imgUplaod() {
    const input = <HTMLInputElement>document.querySelector('input[type=file]');

    const reader = new FileReader();
    reader.onload = () => {
      this.img.onload = () => {
        const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = this.img.naturalWidth;
        canvas.height = this.img.naturalHeight;
        ctx.drawImage(this.img, 0, 0);        
        // console.log(this.img.naturalWidth);
        // console.log(this.img.naturalHeight);
      }
      this.img.src = reader.result as string;
      console.log(reader.result);
      
    }
    reader.readAsDataURL(input.files[0]);
    document.getElementById("fileName").innerHTML = "Įkelta failas - " + input.files[0].name;
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
      planWidth: this.img.naturalWidth,
      planHeight: this.img.naturalHeight,
      planScale: +scale.toFixed(2)
    }

    this.plan = planObj;
    this._apiService.addPlan(this.plan).subscribe((plan) => {
      this._success.next(`Operacija atlikta sėkmingai!`);
    }, (error) => {
      console.log(error);
      alert("Atsiprašome, įvyko klaida. Patikrinkite ar planas tokiu pavadinimu jau nėra užregistruotas.")
    });
  }

}
