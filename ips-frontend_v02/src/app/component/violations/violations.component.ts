import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/api/services';
import { Violations } from 'src/app/api/models';

@Component({
  selector: 'app-violations',
  templateUrl: './violations.component.html',
  styleUrls: ['./violations.component.css']
})
export class ViolationsComponent implements OnInit {
  private violations: Violations[] = [];
  displayedColumns: string[] = ['id', 'objectCode', 'objectType', 'objectName', 'objectAccessLevel', 'RestrictedArea', 'PlanName', 'ViolationDateTime'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getViolations();
  }

  getViolations() {
    this._apiService.getViolation().subscribe((violations) => {
      this.violations = violations
      this.dataSource = new MatTableDataSource<Violations>(this.violations);
      this.dataSource.paginator = this.paginator;      
    }, (error) => {
      console.log(error);
    })
    return this.violations;
  }

}

