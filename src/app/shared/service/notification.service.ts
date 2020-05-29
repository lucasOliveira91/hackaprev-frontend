import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable()
export class NotificationService {


    constructor(
        private alertController: AlertController,
    ) { }

    async notify(message: string, subHeader?: string ) {
        const alert = await this.alertController.create({
            header: 'Mensagem do Sistema',
            subHeader: subHeader,
            message: message,
            buttons: ['OK']
        });

        await alert.present();
    }
}