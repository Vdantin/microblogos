import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../service/validate.service'
import { AuthService } from '../../service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 5000
    });
    this.router.navigate(['/login']);
    return false;
  }
  getAuthService() {
    return this.authService;
  }
}
