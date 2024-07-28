import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const username = this.username;
    const password = this.password;
    if (!this.validateService.validateLoginForm(username, password)) {
      this.toastr.error('Please fill in all fields', 'Validation Error', {
        timeOut: 3000,
      });
      return false;
    }

    this.authService.tryLogin(username, password).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.toastr.success('Log in Successfully', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['dashboard']);
      } else {
        this.toastr.error(data.msg, 'Error', {
          timeOut: 3000,
        });
        this.router.navigate(['login']);
      }
    });

    return true;
  }
}
