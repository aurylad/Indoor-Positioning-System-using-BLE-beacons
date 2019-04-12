import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { StarterComponent } from './starter.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pagrindinis',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Pagrindinis' }
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  declarations: [
    StarterComponent
  ]
})
export class StarterModule { }
