import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('dash');
  }

  logout() {
    this.authService.logout().subscribe(
      ({ data }) => {
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
