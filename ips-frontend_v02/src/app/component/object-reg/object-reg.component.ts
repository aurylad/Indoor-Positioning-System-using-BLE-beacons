import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TrackedObject } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-object-reg',
  templateUrl: './object-reg.component.html',
  styleUrls: ['./object-reg.component.css']
})
export class ObjectRegComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  private trackedObjects: TrackedObject[];
  displayedColumns: string[] = ['position', 'name', 'type', 'accessLevel', 'objectCode'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  userForm: any = {};
  staticAlertClosed = false;
  successMessage: string;
  private _success = new Subject<string>();
  ngOnInit() {
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));
    this.getTrackedObjects();
  }

  getTrackedObjects() {
    this._apiService.getObject().subscribe((trackedObjects) => {
      this.trackedObjects = trackedObjects
    }, (error) => {
      console.log(error);
    })
    return this.trackedObjects;
  }

  // private trackedObjectToSave: TrackedObject = {};
  saveTrackedObject(trackedObjectToSave: TrackedObject = {}) {    
    this._apiService.addObject(trackedObjectToSave).subscribe((trackedObjectToSave) => {
      this._success.next(`Operacija atlikta sėkmingai!`);
      this.getTrackedObjects();
    }, (error) => {
      console.log(error);
      alert("Šis objektas jau užregistruotas!")
    });
  }

  formData(objectForm: NgForm): void {

    if ((objectForm.value.objectName, objectForm.value.objectAccessLevel, objectForm.value.objectType) !== "") {
      var d = new Date();
      let objectCode: any;
      objectCode = objectForm.value.objectName.substring(0, 3) + "" + d.getMinutes() + "" + d.getSeconds(); //Autogenerate object code

      const trackedObj = <TrackedObject>{
        objectType: objectForm.value.objectType,
        objectName: objectForm.value.objectName,
        objectAccessLevel: objectForm.value.objectAccessLevel,
        objectCode: objectCode
      }
      this.saveTrackedObject(trackedObj);
    } else {
      alert("Visi laukai privalo būti užpildyti.");
    }
  }
}
