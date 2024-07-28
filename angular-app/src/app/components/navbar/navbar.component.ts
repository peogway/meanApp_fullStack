import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogoutClick() {
    this.authService.logout();
    this.toastr.success('Logout successfully', 'Success', {
      timeOut: 3000,
    });
    this.router.navigate(['login']);
    return false;
  }

  checkLoggedIn() {
    return this.authService.loggedIn();
  }
}
