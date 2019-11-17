import { Component, OnInit } from '@angular/core';
import { Login } from '../_models';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  error: string = null;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.login);
    this.authService.login(this.login)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log('OK');
          }
        }, 
        error => {
          this.error = JSON.stringify(error);
        }
      );
  }

}
