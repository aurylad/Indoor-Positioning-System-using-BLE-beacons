import { Component, OnInit } from '@angular/core';
import { Beacon } from 'src/app/api/models';
import { MatDialogRef } from '@angular/material';
import { EditDataService } from 'src/app/api/services/edit-data.service';
import { ApiService } from 'src/app/api/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-beacon-edit',
  templateUrl: './beacon-edit.component.html',
  styleUrls: ['./beacon-edit.component.css']
})
export class BeaconEditComponent implements OnInit {

  beaconData: Beacon;

  constructor(public dialogRef: MatDialogRef<BeaconEditComponent>, private service: EditDataService, private _apiService: ApiService) { }

  ngOnInit() {
    this.beaconData = this.service.beaconGetter();
  }

  onEdit(editedData: NgForm): void {
    const editedBeacon = <Beacon>{
      id: this.beaconData.id,
      beaconId: editedData.value.beaconId
    }

    if (!(this.beaconData.id == undefined)) {
      this._apiService.updateBeacon(editedBeacon).subscribe((editedBeacon) => {
        this.dialogRef.close();
        console.log("Updated");
      }, (error) => {
        console.log(error);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
