import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateRegister(user: User): boolean {
    if (!user.name || !user.username || !user.email || !user.password) {
      return false;
    }
    return true;
  }

  validateLoginForm(username: string, password: string): boolean {
    if (!username || !password) {
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
