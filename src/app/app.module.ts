import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from './shared/service/storange.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './security/auth.guard';
import { AuthService } from './security/auth.service';
import { ApplicationErrorHandler } from './config/app.error.handler';
import { NotificationService } from './shared/service/notification.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({config: {tokenGetter: tokenGetter}})
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    StorageService,
    JwtHelperService,
    AuthGuard,
    NotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
