import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { SignUpComponent } from 'src/app/shared/components/sign-up/sign-up.component';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { BrowserSupportGuardService } from './../../core/helpers/browser-support.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoryComponent } from './pages/category/category.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeEditPageComponent } from './pages/employee-edit-page/employee-edit-page.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: `/${RouteConstant.login}`, pathMatch: 'full' },
  {
    path: `${RouteConstant.login}`,
    component: AuthComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'LOGIN',
    },
  },
  {
    path: `sign-up`,
    component: SignUpComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: `${RouteConstant.rooms}`,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        component: GeneralInfoComponent,
        data: {
          i18nKey: 'GENERAL_LIST',
        },
      },
      {
        path: `:id`,
        component: GroupDetailsComponent,
        data: {
          i18nKey: 'EMPLOYEE_DETAIL',
        },
      },
      {
        path: `:id/edit`,
        component: EmployeeEditPageComponent,
        data: {
          i18nKey: 'EMPLOYEE_EDIT',
        },
      },
    ],
  },
  {
    path: `${RouteConstant.page404}`,
    component: ErrorComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'PAGE_404',
    },
  },
  {
    path: `${RouteConstant.page5xx}`,
    component: ErrorComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'PAGE_5XX',
    },
  },
  {
    path: `${RouteConstant.notSupported}`,
    component: ErrorComponent,
    canActivate: [BrowserSupportGuardService],
    data: {
      i18nKey: 'NOT_SUPPORTED',
    },
  },
  {
    path: `${RouteConstant.accountInformation}`,
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'ACCOUNT_INFORMATION',
    },
  },
  {
    path: `${RouteConstant.accountInformation}/edit`,
    component: EmployeeEditPageComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'ACCOUNT_INFORMATION',
    },
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'CATEGORY',
    },
  },
];
