import { AuthService } from './../security/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(
        private injector: Injector,
        private zone: NgZone,
        private notificationService: NotificationService
    ) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            let objEror; 
            
            try {
                objEror = JSON.parse(errorResponse.error);
            }catch(ex) {
                objEror=errorResponse;
            }

            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                         this.notificationService.notify('Usuário ou senha inválido!');
                        this.injector.get(AuthService).handleLogin();
                        break;
                    case 403:
                        this.notificationService.notify('É necessário efetuar o login.');
                        this.injector.get(AuthService).handleLogin();
                        break;
                    case 404:
                        this.notificationService.notify(objEror.message || 'Not Found.');
                        break;
                    default:
                        this.notificationService.notify(objEror.message || 'Erro ao executar operação');
                    break;
                }
            });
        }
        super.handleError(errorResponse);
    }
}