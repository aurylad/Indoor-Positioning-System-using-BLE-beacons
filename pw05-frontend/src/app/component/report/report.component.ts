import { Component, OnInit } from '@angular/core';

import { ReportLine } from 'src/app/api/models';

import { ApiService } from '../../api/services';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  rows: ReportLine[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getGuestVisitsReport().subscribe(
      data => this.rows = data);
  }
}
