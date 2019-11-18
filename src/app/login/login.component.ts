import { Component, OnInit } from '@angular/core';
import { Login } from '../_models';
import { AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
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
  returnUrl: string;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.login)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.body.idContratante == null) {
            this.returnUrl = 'perfil-prestador/' + data.body.idPrestador;
          } else if (data.body.idPrestador == null) {
            this.returnUrl = 'perfil-contratante/' + data.body.idContratante;
          }
          this.router.navigate([this.returnUrl]);
        }, 
        error => {
          console.log(error);
          this.toastr.error(error.error.error);
        }
      );
  }

}
