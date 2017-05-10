import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../service/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private ValidateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Require fields
    if(!this.ValidateService.validateRegister(user)) {
      console.log('fill all fields please');
      return false;

    }
  }
}
