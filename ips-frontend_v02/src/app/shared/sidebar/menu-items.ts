import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Meniu',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/starter',
    title: 'Pagrindinis',
    icon: 'mdi mdi-gauge',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/plan-upload',
    title: 'Plano įkėlimas',
    icon: 'mdi mdi-google-maps',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/beacon-reg',
    title: 'Siųstuvų registracija',
    icon: 'mdi mdi-google-circles-extended',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/object-reg',
    title: 'Objekto registracija',
    icon: 'mdi mdi-account-box',                      
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/restricted-area-reg',
    title: 'Draudžiamos zonos',
    icon: 'mdi mdi-minus-circle-outline',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/restricted-area-list',
    title: 'Draudžiamų zonų sąrašas',
    icon: 'mdi mdi-equal',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Objektų judėjimas',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/component/violations',
    title: 'Užregistruoti pažeidimai',
    icon: 'mdi mdi-clipboard-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/object-rendering',
    title: 'Istorija',
    icon: 'mdi mdi-monitor',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/real-time-rendering',
    title: 'Stebėti objektus',
    icon: 'mdi mdi-message-video',
    class: '',
    extralink: false,
    submenu: []
  }
];
