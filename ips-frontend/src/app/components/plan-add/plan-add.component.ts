import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {

  indexForCoordToShow = 0;
  firstPointX;
  firstPointY;
  resultDistBetweenPoints;

  constructor() { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
  }

  imgUplaod() {
    const input = <HTMLInputElement>document.querySelector('input[type=file]');
    console.log(input.files);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        console.log(img.naturalWidth);
        console.log(img.naturalHeight);
      }
      img.src = reader.result as string;
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
      console.log( this.resultDistBetweenPoints);
      
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

  // showCoords(event) {
  //   this.indexForCoordToShow++;

  //   if (this.indexForCoordToShow == 2) {
  //     var cX = event.clientX;
  //     var cY = event.clientY;
  //     this.cXFirst = cX;
  //     this.cYFirst = cY;
  //   } else if (this.indexForCoordToShow > 2) {
  //     cX = event.clientX;
  //     cY = event.clientY;
  //     this.cXSecond = cX;
  //     this.cYSecond = cY;

  //     var resultBetweenX = this.cXFirst - this.cXSecond;
  //     var resultBetweenY = this.cYFirst - this.cYSecond;

  //     if (Math.abs(resultBetweenX) > Math.abs(resultBetweenY)) {
  //       document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenX) + " pixels";
  //     } else {
  //       document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenY) + " pixels";
  //     }

  //     this.indexForCoordToShow = 1;
  //   }
  // }
























  // measuringToolCheckBox() {
  //   let element = <HTMLInputElement>document.getElementById("myonoffswitch");
  //   if (element.checked) {
  //     (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = false;
  //     this.showCoords(event);
  //   } else {
  //     (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
  //   }
  // }

  // url: any = " ";
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = (<FileReader>event.target).result;
  //     }
  //   }
  // }

  // showCoords(event) {
  //   this.indexForCoordToShow++;

  //   if (this.indexForCoordToShow == 2) {
  //     var cX = event.clientX;
  //     var cY = event.clientY;
  //     this.cXFirst = cX;
  //     this.cYFirst = cY;
  //   } else if (this.indexForCoordToShow > 2) {
  //     cX = event.clientX;
  //     cY = event.clientY;
  //     this.cXSecond = cX;
  //     this.cYSecond = cY;

  //     var resultBetweenX = this.cXFirst - this.cXSecond;
  //     var resultBetweenY = this.cYFirst - this.cYSecond;

  //     if (Math.abs(resultBetweenX) > Math.abs(resultBetweenY)) {
  //       document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenX) + " pixels";
  //     } else {
  //       document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenY) + " pixels";
  //     }

  //     this.indexForCoordToShow = 1;
  //   }
  // }
}
