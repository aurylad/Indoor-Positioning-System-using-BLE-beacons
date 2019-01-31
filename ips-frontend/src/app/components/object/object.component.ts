import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/services/api.service';
import { TrackedObject } from '../../api/models/tracked-object';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private trackedObject: TrackedObject[];

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    console.log("Testing")
    this._apiService.getObject().subscribe((trackedObject) => {
      console.log(trackedObject);
      this.trackedObject = trackedObject;
    }, (error) => {
      console.log(error);
    })

  }

}
