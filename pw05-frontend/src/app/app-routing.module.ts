import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTE_PRICE_ADD, ROUTE_PRICES, ROUTE_GUEST_VISIT_ADD,
  ROUTE_GUEST_VISITS, ROUTE_REPORT } from './app-routing.model';

import { PriceDetailsComponent } from './component/price-details/price-details.component';
import { PricesComponent } from './component/prices/prices.component';
import { ReportComponent } from './component/report/report.component';
import { GuestVisitDetailsComponent } from './component/guest-visit-details/guest-visit-details.component';
import { GuestVisitsComponent } from './component/guest-visits/guest-visits.component';

const routes: Routes = [
  { path: ROUTE_PRICE_ADD, component: PriceDetailsComponent },
  { path: ROUTE_PRICES, component: PricesComponent },
  { path: ROUTE_PRICES + '/:id', component: PriceDetailsComponent },
  { path: ROUTE_GUEST_VISIT_ADD, component: GuestVisitDetailsComponent },
  { path: ROUTE_GUEST_VISITS, component: GuestVisitsComponent },
  { path: ROUTE_GUEST_VISITS + '/:id', component: GuestVisitDetailsComponent },
  { path : ROUTE_REPORT, component : ReportComponent },
  { path : '', component : ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
