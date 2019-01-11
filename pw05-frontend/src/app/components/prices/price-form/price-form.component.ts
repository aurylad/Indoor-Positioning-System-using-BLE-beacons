import { Component, OnInit } from '@angular/core';
import { Price } from '../price'
import { PricesService } from '../../../service/prices/prices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent implements OnInit {
  private price: Price;
  constructor(private _priceService: PricesService, private _router: Router) { }

  ngOnInit() {
    this.price = this._priceService.getter();
    console.log(this.price);
  }

  processForm() {
    if (this.price == undefined) {
      this._priceService.addPrice(this.price).subscribe((price) => {
        this._router.navigate(['/prices'])
      }, (error) => {
        this._router.navigate(['/prices'])
        console.log(error);
      });
    } else {
      this._priceService.updatePrice(this.price).subscribe((price) => {
        console.log(price);
        this._router.navigate(['/prices'])
      }, (error) => {
        this._router.navigate(['/prices'])
        console.log(error);
      });
    }
  }

}
