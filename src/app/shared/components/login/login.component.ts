import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { RouteConstant } from '../../constants/route.constant';
import { AuthHttpService } from '../../http/auth-http.service';
import { tap } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'ah-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: SocialUser;
  public loggedIn: boolean;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(6)),
  });

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.authHttpService.login(this.loginForm.value).pipe(tap((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.router.navigateByUrl(RouteConstant.rooms);
    })).toPromise();
  }

  public onNavigateToSignUpPage(): void {
    this.router.navigateByUrl('sign-up');
    console.log('ok');

  }

  public onNavigateToResetPage(): void {
    this.router.navigateByUrl('reset-password');
  }
}
