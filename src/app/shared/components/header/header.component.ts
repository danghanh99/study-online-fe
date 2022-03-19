import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteConstant } from '../../constants/route.constant';

@Component({
  selector: 'ah-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  public userName = localStorage.getItem('userName');
  constructor(
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('login');
  }

  public navigateToHome(): void {
    this.router.navigateByUrl(`/${RouteConstant.rooms}`);
  }

  public navigateToAccountInfor(): void {
    this.router.navigateByUrl(`/${RouteConstant.accountInformation}`);
  }
}
