import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ReportsListComponent } from './components/report/reports-list/reports-list.component';
import { PricesListComponent } from './components/prices/prices-list/prices-list.component';
import { WorkLogsListComponent } from './components/work-logs/work-logs-list/work-logs-list.component';
import { WorkLogFormComponent } from './components/work-logs/work-log-form/work-log-form.component';
import { PriceFormComponent } from './components/prices/price-form/price-form.component';
import { ReportService } from './service/report/report.service';
import { PricesService } from './service/prices/prices.service';
import { WorkLogsService } from './service/work-logs/work-logs.service';
import { from } from 'rxjs';

const appRoutes: Routes = [
  { path: '', component: ReportsListComponent },
  { path: 'prices', component: PricesListComponent },
  { path: 'price-form', component: PriceFormComponent },
  { path: 'work-logs', component: WorkLogsListComponent },
  { path: 'work-log-from', component: WorkLogFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ReportsListComponent,
    PricesListComponent,
    WorkLogsListComponent,
    WorkLogFormComponent,
    PriceFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ReportService, PricesService, WorkLogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
