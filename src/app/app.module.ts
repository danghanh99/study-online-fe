import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { EmployeesModule } from './modules/employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomTranslateLoader } from './shared/loader/custom-translate.loader';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SocialLoginModule } from 'angularx-social-login';
import { ModalModule } from 'ngx-bootstrap/modal';

export function LoaderFactory() {
  return new CustomTranslateLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    EmployeesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LoaderFactory,
      },
    }),
    RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' }),
    SocialLoginModule,
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
