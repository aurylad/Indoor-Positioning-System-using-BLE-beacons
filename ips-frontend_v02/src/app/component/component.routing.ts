import { Routes } from '@angular/router';

import { NgbdplanUploadBasicComponent } from './plan-upload/plan-upload.component';
import { BeaconRegComponent } from './beacon-reg/beacon-reg.component';
import { ObjectRegComponent } from './object-reg/object-reg.component';
import { ObjectRenderingComponent } from './object-rendering/object-rendering.component';
import { RestrictedAreaRegComponent } from './restricted-area-reg/restricted-area-reg.component';
import { ViolationsComponent } from './violations/violations.component';
import { RealTimeRenderingComponent } from './real-time-rendering/real-time-rendering.component';
import { RestrictedAreaListComponent } from './restricted-area-list/restricted-area-list.component';


export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'plan-upload',
        component: NgbdplanUploadBasicComponent,
        data: {
          title: 'Plano įkėlimas',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Plano įkėlimas' }
          ]
        }
      },
      {
        path: 'beacon-reg',
        component: BeaconRegComponent,
        data: {
          title: 'Siųstuvų registracija',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Siųstuvų registracija' }
          ]
        }
      },
      {
        path: 'object-reg',
        component: ObjectRegComponent,
        data: {
          title: 'Objektų registracija',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Objektų registracija' }
          ]
        }
      },
      {
        path: 'object-rendering',
        component: ObjectRenderingComponent,
        data: {
          title: 'Objektų atvaizdavimas',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Objektų atvaizdavimas' }
          ]
        }
      },
      {
        path: 'real-time-rendering',
        component: RealTimeRenderingComponent,
        data: {
          title: 'Stebėti objektus',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Objektų stebėjimas' }
          ]
        }
      },
      {
        path: 'restricted-area-reg',
        component: RestrictedAreaRegComponent,
        data: {
          title: 'Draudžiamų zonų nustatymas',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Draudžiamų zonų nustatymas' }
          ]
        }
      },
      {
        path: 'restricted-area-list',
        component: RestrictedAreaListComponent,
        data: {
          title: 'Draudžiamų zonų sąrašas',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Draudžiamų zonų sąrašas' }
          ]
        }
      },
      {
        path: 'violations',
        component: ViolationsComponent,
        data: {
          title: 'Pažeidimai',
          urls: [
            { title: 'Pagrindinis', url: '/dashboard' },
            { title: 'Užregistruoti pažeidimai' }
          ]
        }
      }
    ]
  }
];
