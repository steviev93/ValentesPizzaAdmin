import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  user: User;
  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.user = authenticationService.getCurrentUser();
  }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onLogout(): void {
    return this.authenticationService.logout();
  }
}
