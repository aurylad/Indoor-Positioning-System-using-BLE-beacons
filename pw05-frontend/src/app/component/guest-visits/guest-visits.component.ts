import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { ROUTE_GUEST_VISIT_ADD, ROUTE_GUEST_VISITS } from 'src/app/app-routing.model';

import { ApiService } from '../../api/services';
import { GuestVisit } from '../../api/models/guest-visit';

@Component({
  selector: 'app-guest-visits',
  templateUrl: './guest-visits.component.html',
  styleUrls: ['./guest-visits.component.css']
})
export class GuestVisitsComponent implements OnInit {

  rows: GuestVisit[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.updateRows();
  }

  private updateRows(): void {
    this.api.getGuestVisits().subscribe(
      data => this.rows = data);
  }

  deleteRow(row: GuestVisit): void {
    if (!confirm('Are you sure to delete work result entry')) {
      return;
    }
    this.api.delGuestVisit(row.id)
      .subscribe( data => {
        this.rows = this.rows.filter(o => o !== row);
      });
  }

  editRow(row: GuestVisit): void {
    this.router.navigate([ROUTE_GUEST_VISITS, row.id]);
  }

  addRow(): void {
    this.router.navigate([ROUTE_GUEST_VISIT_ADD]);
  }

  // REF.:
  // https://stackoverflow.com/questions/47936183/angular-file-upload
  handleFileInput(files: FileList) {
    const fileToUpload: File = files.item(0);
    this.api.uploadGuestVisitCsv(fileToUpload)
    .pipe(first()).subscribe(
      data => {
        console.log('Uploaded');
        this.updateRows();
      },
      error => {
        console.log(error);
        alert(error);
      });
  }
}
