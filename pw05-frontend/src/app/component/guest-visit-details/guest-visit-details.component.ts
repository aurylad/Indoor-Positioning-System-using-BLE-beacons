import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ApiService } from 'src/app/api/services';

import { ROUTE_GUEST_VISITS } from '../../app-routing.model';
import { GuestVisit } from '../../api/models/guest-visit';

@Component({
  selector: 'app-guest-visit-details',
  templateUrl: './guest-visit-details.component.html',
  styleUrls: ['./guest-visit-details.component.css']
})
export class GuestVisitDetailsComponent implements OnInit {

  model: GuestVisit = {};

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getGuestVisit(id)
        .subscribe( data => {
          this.model = data;
        });
    }
  }

  onSubmit() {
    let response: Observable<any>;
    if (this.model.id) {
      response = this.api.updateGuestVisit(this.model);
    } else {
      response = this.api.addGuestVisit(this.model);
    }
    response
      .pipe(first())
      .subscribe(
        data => {
          this.back();
        },
        error => {
          alert(error);
        });
  }

  private back(): void {
    this.router.navigate([ROUTE_GUEST_VISITS]);
  }

  onCancel() {
    this.back();
  }
}
