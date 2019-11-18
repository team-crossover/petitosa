import { Component, OnInit } from '@angular/core';
import { Login } from '../_models';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  error: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.login)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log(data);
          }
        }, 
        error => {
          this.toastr.error(error.error);
        }
      );
  }

}
