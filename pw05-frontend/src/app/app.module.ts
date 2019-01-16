import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiModule } from './api/api.module';
import { NavigationComponent } from './component/navigation/navigation.component';
import { PriceDetailsComponent } from './component/price-details/price-details.component';
import { PricesComponent } from './component/prices/prices.component';
import { ReportComponent } from './component/report/report.component';
import { GuestVisitDetailsComponent } from './component/guest-visit-details/guest-visit-details.component';
import { GuestVisitsComponent } from './component/guest-visits/guest-visits.component';

@NgModule({
  declarations: [
    AppComponent,
    PricesComponent,
    PriceDetailsComponent,
    GuestVisitsComponent,
    GuestVisitDetailsComponent,
    ReportComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ApiModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
