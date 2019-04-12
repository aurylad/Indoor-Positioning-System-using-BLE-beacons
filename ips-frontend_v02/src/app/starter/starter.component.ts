import { Component, AfterViewInit, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from '../api/services';
import { Plan, Beacon, RestrictedArea, BeaconInPlan } from '../api/models';
import { EditDataService } from '../api/services/edit-data.service';

@Component({
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  ngOnInit(): void {
    this.getPlans();
    this.getRestrictedAreas();
    this.getInfrastructer();
  }

  displayedColumnsForPlans: string[] = ['planName', 'planWidth', 'planHeight', 'actions'];
  dataSourceForPlans;

  displayedColumnsForAreas: string[] = ['restrictedAreaName', 'accessLevel', 'planId'];
  dataSourceForAreas;

  displayedColumnsForInfra: string[] = ['allBeacons', 'unusedBeacons', 'plans'];
  dataSourceForInfra;

  private plans: Plan[] = [];
  private beacons: Beacon[] = [];
  private beaconsInPlan: BeaconInPlan[];
  private restrictedAreas: RestrictedArea[] = [];
  private infrastructer: any[] = [];

  private plansForMain: any[] = [];
  private amountOfBeacons: number = 0;
  private amountOfPlans: number = 0;
  private amountOfBeaconsInPlan: number = 0;
  private amountOfAvaliableBeacons: number = 0;

  @ViewChild('areasPaginator', { read: MatPaginator }) areasPaginator: MatPaginator;
  @ViewChild('plansPaginator', { read: MatPaginator }) plansPaginator: MatPaginator;

  constructor(private _apiService: ApiService, private service: EditDataService) { }

  getPlans(): Plan[] {
    this.plansForMain = [];
    this._apiService.getPlan().subscribe((plans) => {
      this.plans = plans;
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
      this.dataSourceForPlans = new MatTableDataSource<any>(this.plansForMain);
      this.dataSourceForPlans.paginator = this.plansPaginator;
    }, (error) => {
      console.log(error);
    })
    return this.plans;
  }

  getInfrastructer() {
    this._apiService.getBeacon().subscribe((beacons) => {
      this.amountOfBeacons = beacons.length;
      this._apiService.getBeaconInPlan().subscribe((beaconsInPlan) => {
        this.amountOfBeaconsInPlan = beaconsInPlan.length;
        this.amountOfAvaliableBeacons = this.amountOfBeacons - this.amountOfBeaconsInPlan;
        this._apiService.getPlan().subscribe((plans) => {
          this.amountOfPlans = plans.length;
          var infrastructer = <any>{
            allBeacons: this.amountOfBeacons,
            unusedBeacons: this.amountOfAvaliableBeacons,
            plans: this.amountOfPlans,
          }
          this.infrastructer.push(infrastructer);
          this.dataSourceForInfra = new MatTableDataSource<any>(this.infrastructer);
          return this.infrastructer;
        }, (error) => {
          console.log(error);
        })
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }

  getRestrictedAreas(): RestrictedArea[] {
    this._apiService.getRestrictedArea().subscribe((areas) => {
      this.restrictedAreas = areas;
      this.dataSourceForAreas = new MatTableDataSource<any>(this.restrictedAreas);
      this.dataSourceForAreas.paginator = this.areasPaginator;
    }, (error) => {
      console.log(error);
    })
    return this.restrictedAreas;
  }

  onDeleteArea(row) {
    if (confirm('Ar tikrai norite ištrinti šį planą?')) {
      this.service.planSetter(row);
      this._apiService.deletePlan(this.service.planGetter().id).subscribe((deletedPlan) => {
        this.plans = this.getPlans();
      }, (error) => {
        console.log(error);
        alert('Panaikinti šio plano nepavyko.');
      });
    }
  }
}
