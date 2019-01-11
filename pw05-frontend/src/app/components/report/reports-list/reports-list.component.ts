import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../service/report/report.service';
import { Report } from '../report';
import { from } from 'rxjs';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  private report: Report[];
  constructor(private _reportService: ReportService) { }

  ngOnInit() {
    this._reportService.getReport().subscribe((report) => {
      console.log(report);
      this.report = report;
    }, (error) => {
      console.log(error);
    })
  }

}
