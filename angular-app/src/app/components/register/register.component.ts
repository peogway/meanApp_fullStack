import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.toastr.error('Please fill in all fields', 'Validation Error', {
        timeOut: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.toastr.error('Please use a valid email', 'Validation Error', {
        timeOut: 3000,
      });
      return false;
    }

    // Register User
    this.authService.addUser(user).subscribe((data) => {
      if (data.success) {
        this.toastr.success(
          'You are now registered and can log in',
          'Success',
          {
            timeOut: 3000,
          }
        );

        this.router.navigate(['login']);
      } else {
        this.toastr.error(data.msg, 'Error', {
          timeOut: 3000,
        });

        this.router.navigate(['register']);
      }
    });

    return true;
  }
}
