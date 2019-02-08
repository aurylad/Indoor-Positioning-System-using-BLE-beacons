import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectComponent } from './components/object/object.component';
import { ApiService } from './api/services/api.service';
import { MainComponent } from './components/main/main.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { PlanAddComponent } from './components/plan-add/plan-add.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  { path: 'object', component: ObjectComponent },
  { path: '', component: MainComponent },
  { path: 'plan/list', component: PlansListComponent },
  { path: 'plan/add', component: PlanAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    MainComponent,
    PlansListComponent,
    PlanAddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
