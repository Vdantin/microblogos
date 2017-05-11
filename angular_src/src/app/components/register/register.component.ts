import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../service/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private FlashMessagesService: FlashMessagesService,
    private AuthService: AuthService,
    private Router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log("hello");

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // // Require fields
    // if (!this.validateService.validateRegister(user)) {
    //   this.FlashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });
    //   return false;
    // }
    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.FlashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 4000 });
      return false;
    }
    // Register user
    this.AuthService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.FlashMessagesService.show('You are now register and you can login', { cssClass: 'alert-success', timeout: 4000 });
        this.Router.navigate(['/login']);
      } else {
        this.FlashMessagesService.show('Smth went wrong', { cssClass: 'alert-success', timeout: 4000 });
        this.Router.navigate(['/register']);
      }
    });
  }
}
