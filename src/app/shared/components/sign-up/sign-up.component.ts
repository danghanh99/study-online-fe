import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { AuthHttpService } from '../../http/auth-http.service';

@Component({
  selector: 'ah-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user: SocialUser;
  public loggedIn: boolean;
  public signUpForm = new FormGroup({
    email: new FormControl('', Validators.email),
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.minLength(6)]),
  });

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { }

  get f() {
    return this.signUpForm.controls;
  }

  public onSubmit(): void {
    this.authHttpService.signUp(this.signUpForm.value).pipe(tap((res) => {
      this.toastr.success('Create success.');
      this.router.navigateByUrl('login');
    })).toPromise();
  }

  public onNavigateToLoginPage(): void {
    this.router.navigateByUrl('login');
  }

  public onNavigateToResetPage(): void {
    this.router.navigateByUrl('reset-password');
  }

}
