import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, MatDialogConfig } from '@angular/material';
import { TrackedObject } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ObjectEditComponent } from '../object-edit/object-edit.component';
import { EditDataService } from 'src/app/api/services/edit-data.service';


@Component({
  selector: 'app-object-reg',
  templateUrl: './object-reg.component.html',
  styleUrls: ['./object-reg.component.css']
})
export class ObjectRegComponent implements OnInit {

  constructor(private _apiService: ApiService, private dialog: MatDialog, private service: EditDataService) { }

  private trackedObjects: TrackedObject[];
  displayedColumns: string[] = ['position', 'name', 'type', 'accessLevel', 'objectCode', 'actions'];
  userForm: any = {};
  staticAlertClosed = false;
  successMessage: string;
  private _success = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    setTimeout(() => (this.staticAlertClosed = true), 20000);
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(5000)).subscribe(() => (this.successMessage = null));
    this.getTrackedObjects();
  }


  getTrackedObjects(): any {
    this._apiService.getObject().subscribe((trackedObjects) => {
      this.trackedObjects = trackedObjects
    }, (error) => {
      console.log(error);
    })
    return this.trackedObjects;
  }

  // private trackedObjectToSave: TrackedObject = {};
  saveTrackedObject(trackedObjectToSave: TrackedObject = {}): void {
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

  // Editing and deleting 
  onEdit(row): void {
    this.service.objectSetter(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(ObjectEditComponent, dialogConfig);
  }

  onDelete(row): void {
    if (confirm('Ar tikrai norite ištrinti šį įrašą?')) {
      this.service.objectSetter(row);
      this._apiService.deleteObject(this.service.objectGetter().id).subscribe((deletedObjet) => {
        this.trackedObjects = this.getTrackedObjects();
      }, (error) => {
        console.log(error);
        alert('Šio objekto panaikinti negalima, nes jis susijąs su įvykdytų pažeidimų sąrašu.');
      });
    }
  }

}
