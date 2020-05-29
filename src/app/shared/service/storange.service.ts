import { LocalUser } from '../../security/local-user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    getLocalUser() {
        const usr = localStorage.getItem("localUser");

        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem("localUser");
        } else {
            localStorage.setItem("localUser", JSON.stringify(obj));
        }
    }

    setItem(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    clean() {
        localStorage.clear();
    }
}