import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material'
import { TrackedObject } from 'src/app/api/models';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api/services';
import { EditDataService } from 'src/app/api/services/edit-data.service';

@Component({
  selector: 'app-object-edit',
  templateUrl: './object-edit.component.html',
  styleUrls: ['./object-edit.component.css']
})
export class ObjectEditComponent implements OnInit {

  objectData: TrackedObject;

  constructor(public dialogRef: MatDialogRef<ObjectEditComponent>, private service: EditDataService, private _apiService: ApiService) { }

  ngOnInit() {
    this.objectData = this.service.objectGetter();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(editedData: NgForm): void {
    const editedObjet = <TrackedObject>{
      id: this.objectData.id,
      objectType: editedData.value.objectType,
      objectName: editedData.value.objectName,
      objectAccessLevel: editedData.value.objectAccessLevel,
      objectCode: this.objectData.objectCode
    }

    if (!(this.objectData.id == undefined)) {
      this._apiService.updateObject(editedObjet).subscribe((editedObjet) => {
        this.dialogRef.close();
        console.log('Updated');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
