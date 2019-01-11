import { Component, OnInit } from '@angular/core';
import { PricesService } from '../../../service/prices/prices.service';
import { Price } from '../price';
import { from } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-prices-list',
  templateUrl: './prices-list.component.html',
  styleUrls: ['./prices-list.component.css']
})
export class PricesListComponent implements OnInit {
  private prices: Price[];
  constructor(private _pricesService: PricesService, private _router: Router) { }

  ngOnInit() {
    this._pricesService.getPrices().subscribe((prices) => {
      console.log(prices);
      this.prices = prices;
    }, (error) => {
      console.log(error);
    })
  }

  deletePrice(price) {
    this._pricesService.deletePrice(price.id).subscribe((prices) => {
      this.prices.splice(this.prices.indexOf(price));
      this._router.navigate(['/prices']);
    }, (error) => {
      console.log(error);
    });
  }

  updatePrice(price) {
    this._pricesService.setter(price);
    this._router.navigate(['/price-form']);
  }

  newPrice() {
    let price = new Price();
    this._pricesService.setter(price);
    this._router.navigate(['/price-form']);
  }
}
