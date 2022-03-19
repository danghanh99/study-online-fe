import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { AuthHttpService } from 'src/app/shared/http/auth-http.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'ah-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  public currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  public infoForm = new FormGroup({
    email: new FormControl(this.currentUser.email, Validators.email),
    name: new FormControl(this.currentUser.name, Validators.required)
  });

  constructor(
    private authService: AuthHttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public updateAccountInfo(): void {
    this.authService.updateUser(this.currentUser.id, this.infoForm.value).pipe(tap((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.toastr.success('Update success.');
    })).toPromise();
  }

  get f() {
    return this.infoForm.controls;
  }
}
