import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    public router: Router,
  ) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const checkUrlLogin = route.routeConfig.path === RouteConstant.login;
    const checkUrlReset =
      route.routeConfig.path === RouteConstant.resetPassword;
    const checkUrlSignUp =
      route.routeConfig.path === 'sign-up';
    if (!!localStorage.getItem('currentUser') && (checkUrlLogin || checkUrlReset || checkUrlSignUp)) {
      return this.router.createUrlTree([RouteConstant.rooms]);
    }
    if (!!!localStorage.getItem('currentUser') && !(checkUrlLogin || checkUrlReset || checkUrlSignUp)) {
      return this.router.createUrlTree([RouteConstant.login]);
    }
    return true;
  }
}
