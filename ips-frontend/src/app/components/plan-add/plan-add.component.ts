import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {

  constructor() { }

  indexForCoordToShow = 0;

  // Variables for distance calculation between two selected points
  cXFirst;
  cYFirst;
  cXSecond;
  cYSecond;

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
  }

  processForm() {

  }

  measuringToolCheckBox() {
    let element = <HTMLInputElement>document.getElementById("myonoffswitch");
    if (element.checked) {
      (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = false;
      this.showCoords(event);
    } else {
      (<HTMLInputElement>document.getElementById("measureCheckBox")).disabled = true;
    }
  }

  url: any = " ";
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = (<FileReader>event.target).result;
      }
    }

  }

  showCoords(event) {
    this.indexForCoordToShow++;

    if (this.indexForCoordToShow == 2) {
      var cX = event.clientX;
      var cY = event.clientY;
      this.cXFirst = cX;
      this.cYFirst = cY;
    } else if (this.indexForCoordToShow > 2) {
      cX = event.clientX;
      cY = event.clientY;
      this.cXSecond = cX;
      this.cYSecond = cY;

      var resultBetweenX = this.cXFirst - this.cXSecond;
      var resultBetweenY = this.cYFirst - this.cYSecond;

      if (Math.abs(resultBetweenX) > Math.abs(resultBetweenY)) {
        document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenX) + " pixels";
      } else {
        document.getElementById("demo").innerHTML = "Pasirinktas atstumas-   " + Math.abs(resultBetweenY) + " pixels";
      }

      this.indexForCoordToShow = 1;
    }
  }
}
