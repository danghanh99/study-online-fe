import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/core/services/title.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: '[ah-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public deviceHistoryIsSelected: boolean;
  public employeesUrl = `/${RouteConstant.rooms}`;
  // public dayOffUrl = `/${RouteConstant.dayOff}`;
  public infoUrl = `/${RouteConstant.accountInformation}`;
  // public deviceCategoriesUrl = `/${RouteConstant.devices}/${RouteConstant.categories}`;

  public isMinimized: boolean;
  public subscription: Subscription;
  constructor(
    public router: Router,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.subscription = this.titleService.isMinimized.subscribe(
      (isMinimized) => {
        this.isMinimized = isMinimized;
      }
    );
  }

  public navigateToGeneralListPage() {
    this.router.navigateByUrl(this.employeesUrl);
  }

  // public navigateToDayoffPage() {
  //   this.router.navigateByUrl(this.dayOffUrl);
  // }

  public navigateToAccountInfoPage() {
    this.router.navigateByUrl(this.infoUrl);
  }

  public navigateToCategoriesPage() {
    this.router.navigateByUrl('/categories');
  }



  // public navigateToDeviceCategoriesPage() {
  //   this.router.navigateByUrl(this.deviceCategoriesUrl);
  // }

  // public navigateToDayOffRequestPage() {
  //   this.router.navigateByUrl(this.dayOffRequestUrl);
  // }



  public onMinimized(): void {
    this.titleService.isMinimized.next(!this.isMinimized);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
