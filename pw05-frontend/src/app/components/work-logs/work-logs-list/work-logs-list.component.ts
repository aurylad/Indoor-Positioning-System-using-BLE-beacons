import { Component, OnInit } from '@angular/core';
import { WorkLogsService } from '../../../service/work-logs/work-logs.service';
import { WorkLog } from '../work-log';
import { from } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-work-logs-list',
  templateUrl: './work-logs-list.component.html',
  styleUrls: ['./work-logs-list.component.css']
})
export class WorkLogsListComponent implements OnInit {
  private workLogs: WorkLog[];
  constructor(private _workLogsService: WorkLogsService, private _router: Router) { }

  ngOnInit() {
    this._workLogsService.getWorkLogs().subscribe((workLogs) => {
      console.log(workLogs);
      this.workLogs = workLogs;
    }, (error) => {
      console.log(error);
    })
  }

  deleteWorkLog(workLog) {
    this._workLogsService.deleteWorkLog(workLog.id).subscribe((workLogs) => {
      this.workLogs.splice(this.workLogs.indexOf(workLog));
      this._router.navigate(['/work-logs']);
    }, (error) => {
      console.log(error);
    });
  }

  updateWorkLog(workLog) {
    console.log(workLog);
    this._workLogsService.setter(workLog);
    this._router.navigate(['/work-log-from']);
  }

  newWorkLog() {
    let workLog = new WorkLog();
    this._workLogsService.setter(workLog);
    this._router.navigate(['/work-log-from']);
  }

}
