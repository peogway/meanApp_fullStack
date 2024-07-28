import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.user = profile.user;
    });
  }
}
