import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './_services';
import { Usuario } from './_models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petitosa';

  isAuthenticated = false;
  userRole = '';
  userName = '???';
  urlProfile = '';
  linkBotaoPrincipal: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    private auth: AuthenticationService
  ) {
    this.loadUsername();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Usuário deslogado com sucesso');
  }

  loadUsername() {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.userRole = user.role;
        if (this.userRole == 'PRESTADOR') {
          this.urlProfile = 'perfil-prestador/' + user.idPrestador;
          this.linkBotaoPrincipal = this.urlProfile;
        } else if (this.userRole == 'CONTRATANTE') {
          this.urlProfile = 'perfil-contratante/' + user.idContratante;
          this.linkBotaoPrincipal = this.urlProfile;
        } else {
          this.urlProfile = null;
        }
          
        if (this.userRole == 'PRESTADOR') {
          this.auth.getCurrentUserPrestador().subscribe(prestador => {
            this.userName = prestador.nome;
          });
        } else if (this.userRole == 'CONTRATANTE') {
          this.auth.getCurrentUserContratante().subscribe(contratante => {
            this.userName = contratante.nome;
          });
        }

      } else {
        this.isAuthenticated = false;
        this.userRole = null;
        this.urlProfile = null;
        this.linkBotaoPrincipal = 'login';
      }
    });
  }

}
