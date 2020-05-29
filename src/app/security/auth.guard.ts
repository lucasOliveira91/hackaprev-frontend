import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    lastUrl: string;

    constructor(
        private authService: AuthService
    ) {}

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthentication(route.routeConfig.path);
    }

    checkAuthentication(path: string): boolean {
        const loggedIn = this.authService.isLoggedIn();
        if (!loggedIn) {
            this.authService.handleLogin(`/${path}`);
        }

        return loggedIn;
    }
}