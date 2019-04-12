import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdplanUploadBasicComponent } from './plan-upload/plan-upload.component';
import { BeaconRegComponent } from './beacon-reg/beacon-reg.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { ObjectRegComponent } from './object-reg/object-reg.component';
import { ObjectRenderingComponent } from './object-rendering/object-rendering.component';
import { RestrictedAreaRegComponent } from './restricted-area-reg/restricted-area-reg.component';
import { ViolationsComponent } from './violations/violations.component';
import { ObjectEditComponent } from './object-edit/object-edit.component';
import { BeaconEditComponent } from './beacon-edit/beacon-edit.component';
import { RealTimeRenderingComponent } from './real-time-rendering/real-time-rendering.component';
import { RestrictedAreaListComponent } from './restricted-area-list/restricted-area-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatPaginatorModule,
    MatStepperModule,
    AngularDateTimePickerModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    NgbdplanUploadBasicComponent,
    BeaconRegComponent,
    ObjectRegComponent,
    ObjectRenderingComponent,
    RestrictedAreaRegComponent,
    ViolationsComponent,
    ObjectEditComponent,
    BeaconEditComponent,
    RealTimeRenderingComponent,
    RestrictedAreaListComponent
  ],
  entryComponents: [
    ObjectEditComponent,
    BeaconEditComponent
  ]
})
export class ComponentsModule { }
