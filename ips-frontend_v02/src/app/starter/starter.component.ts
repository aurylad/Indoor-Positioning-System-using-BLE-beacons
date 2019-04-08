import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from '../api/services';
import { Plan, Beacon } from '../api/models';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'planName', 'planWidth', 'planHeight'];
  dataSource;
  private plans: Plan[] = [];
  private beacons: Beacon[] = [];
  plansForMain: any[] = [];
  amountOfBeacons: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _apiService: ApiService) { }

  ngAfterViewInit() {
    this.getPlans();
    this.getBeacons();
  }

  getPlans() {
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans;
      this.planDataToView();
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  planDataToView() {
    this.plans.forEach(element => {
      let widthInMeters = (element.planWidth * element.planScale) / 100;
      let heightInMeters = (element.planHeight * element.planScale) / 100;
      const filtresPlansData = <any>{
        id: element.id,
        planName: element.planName,
        planWidth: widthInMeters.toFixed(2),
        planHeight: heightInMeters.toFixed(2)
      }
      this.plansForMain.push(filtresPlansData);
    });
    this.dataSource = new MatTableDataSource<any>(this.plansForMain);
    this.dataSource.paginator = this.paginator;
  }

  getBeacons() {
    this._apiService.getBeacon().subscribe((beacons) => {
      this.beacons = beacons;
      this.beaconsDataToView();
    }, (error) => {
      console.log(error);
    })
    return this.beacons;
  }

  beaconsDataToView() {
    this.beacons.forEach(element => {
      this.amountOfBeacons++;
    });
  }

}
