import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api/services';
import { Price } from '../../api/models/price';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { ROUTE_PRICE_ADD, ROUTE_PRICES } from 'src/app/app-routing.model';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  rows: Price[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.updateRows();
  }

  deleteRow(row: Price): void {
    if (!confirm('Are you sure to delete price entry')) {
      return;
    }
    this.api.delPrice(row.id)
      .subscribe( data => {
        this.rows = this.rows.filter(o => o !== row);
      });
  }

  editRow(row: Price): void {
    this.router.navigate([ROUTE_PRICES, row.id]);
  }

  addRow(): void {
    this.router.navigate([ROUTE_PRICE_ADD]);
  }

  private updateRows(): void {
    this.api.getPrices().subscribe(
      rows => this.rows = rows);
  }

  // REF.:
  // https://stackoverflow.com/questions/47936183/angular-file-upload
  handleFileInput(files: FileList) {
    const fileToUpload: File = files.item(0);
    this.api.uploadPricesCsv(fileToUpload)
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
