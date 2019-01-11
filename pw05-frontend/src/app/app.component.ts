import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router) { }
  title = 'pw05-frontend';

  showPricesTable() {
    this._router.navigate(['/prices']);
  }

  showWorkLogsTable() {
    this._router.navigate(['/work-logs']);
  }

  showReportTable() {
    this._router.navigate(['/']);
  }
}
