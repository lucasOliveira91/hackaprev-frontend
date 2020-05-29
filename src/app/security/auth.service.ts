import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from './local-user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { StorageService } from '../shared/service/storange.service';

@Injectable()
export class AuthService {
    user: LocalUser;
    lastUrl: string;

    constructor(
        public http: HttpClient,
        public httpSimple: HttpClient,
        public storage: StorageService,
        private jwtHelperService: JwtHelperService,
        private router: Router
        ) {
    }

    authenticate(cpf: string, password: string) {
        return this.http.post(`${environment.api}/login`, {cpf: cpf, password: password}, {observe: 'response'});
    }

    refreshToken() {
        return this.http.post(`${environment.api}/auth/refresh_token`, {}, {observe: 'response'});
    }

    getToken(url?: string): string {

        if(url.indexOf('refresh_token') == -1) {
            this.refreshToken().subscribe(response => {
                this.successfulLogin(response.headers.get('Authorization'));
            });
        }
        return this.storage.getLocalUser().token;
    }

    
    successfulLogin(authorizationValue: string) {
        const tok = authorizationValue.substring(7);
        this.user = {
            token: tok,
            nome: this.jwtHelperService.decodeToken(tok).nome
        };

        this.storage.setLocalUser(this.user);
    }

    logout() {
        this.storage.clean();
    }

    isLoggedIn(): boolean {
        this.user = this.storage.getLocalUser();
        return this.user ? true : false;
    }

    handleLogin(path: string = this.lastUrl) {
        this.storage.setLocalUser(null);
        this.router.navigate(['/login', btoa(path)]);
    }

}