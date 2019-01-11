import { Component, OnInit } from '@angular/core';
import { WorkLog } from '../work-log'
import { WorkLogsService } from '../../../service/work-logs/work-logs.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-work-log-form',
  templateUrl: './work-log-form.component.html',
  styleUrls: ['./work-log-form.component.css']
})
export class WorkLogFormComponent implements OnInit {
  private workLog: WorkLog;
  constructor(private _workLogService: WorkLogsService, private _router: Router) { }

  ngOnInit() {
    this.workLog = this._workLogService.getter();
  }

  processForm() {
    if (this.workLog == undefined) {
      this._workLogService.addWorkLog(this.workLog).subscribe((workLog) => {
        this._router.navigate(['/work-logs'])
        console.log(workLog);
      }, (error) => {
        this._router.navigate(['/work-logs'])
        console.log(error);
      });
    } else {
      this._workLogService.updateWorkLog(this.workLog).subscribe((workLog) => {
        console.log(workLog);
        this._router.navigate(['/work-logs'])
      }, (error) => {
        this._router.navigate(['/work-logs'])
        console.log(error);
      });
    }
  }



}
