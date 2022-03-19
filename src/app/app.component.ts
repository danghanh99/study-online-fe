import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from './core/services/title.service';
import { UserStoreService } from './core/services/store/user-store.service';

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-helper-fe';

  constructor(
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private userStore: UserStoreService
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');

    const lang = localStorage.getItem('language');
    translate.use(lang ? (lang.match('vi || en') ? lang : 'en') : 'en');
    userStore.fetchCurrentUser();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);

        rt.data.subscribe((data) => {
          this.titleService.setTitle(data.i18nKey);
        });
      });
  }

  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
