import { Routes } from '@angular/router';
import { RouteConstant } from './shared/constants/route.constant';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: '**',
    redirectTo: `/${RouteConstant.page404}`,
  },
];
