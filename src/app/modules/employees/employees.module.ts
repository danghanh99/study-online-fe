import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxCurrencyModule } from 'ngx-currency';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { EditGroupModalComponent } from './components/edit-group-modal/edit-group-modal.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { GeneralListComponent } from './components/room-list/general-list.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { RemoveUserModalComponent } from './components/room-remove-user/remove-user-modal.component';
import { StatusConfirmComponent } from './components/status-confirm/status-confirm.component';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoryComponent } from './pages/category/category.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeEditPageComponent } from './pages/employee-edit-page/employee-edit-page.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: false,
};
@NgModule({
  declarations: [
    GeneralListComponent,
    GeneralInfoComponent,
    StatusConfirmComponent,
    LoginComponent,
    AuthComponent,
    EmployeeDetailComponent,
    EmployeeDetailsComponent,
    GroupDetailsComponent,
    EmployeeEditComponent,
    EmployeeEditPageComponent,
    ConfirmModalComponent,
    GroupDetailComponent,
    RemoveUserModalComponent,
    EditGroupModalComponent,
    CategoryListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxCurrencyModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    RouterModule.forChild(EMPLOYEES_ROUTES),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [BsModalRef, DatePipe],
})
export class EmployeesModule { }
