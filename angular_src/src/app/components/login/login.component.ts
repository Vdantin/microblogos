import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../service/validate.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    // Login user
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessagesService.show('data.msg', {
        cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });

  }

}
