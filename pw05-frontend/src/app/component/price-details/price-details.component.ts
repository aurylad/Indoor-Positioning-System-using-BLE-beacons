import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/services';
import { Observable } from 'rxjs';
import { Price } from '../../api/models/price';

import { first } from 'rxjs/operators';
import { ROUTE_PRICES } from 'src/app/app-routing.model';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit {

  model: Price = {};

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getPrice(id)
        .subscribe( data => {
          this.model = data;
        });
    }
  }

  onSubmit() {
    let response: Observable<any>;
    if (this.model.id) {
      response = this.api.updatePrice(this.model);
    } else {
      response = this.api.addPrice(this.model);
    }
    response
      .pipe(first())
      .subscribe(
        data => {
          this.model = data;
          this.back();
        },
        error => {
          alert(error);
        });
  }

  private back(): void {
    this.router.navigate([ROUTE_PRICES]);
  }

  onCancel() {
    this.back();
  }
}
