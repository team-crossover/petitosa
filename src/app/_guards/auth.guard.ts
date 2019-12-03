import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (route.data) {
            const currentUser = this.authenticationService.currentUserValue;
            if (route.data.requiresGuest) {
                if (currentUser) {
                    if (currentUser.idContratante) {
                        this.router.navigate(['/perfil-contratante/' + currentUser.idContratante]);
                    } else {
                        if (currentUser.idPrestador) {
                            this.router.navigate(['/perfil-prestador/' + currentUser.idPrestador]);
                        }
                    }
                    
                    return false;
                }
            } else if (route.data.requiresRoles) {
                if (!currentUser || !route.data.requiresRoles.includes(currentUser.role.toLowerCase())) {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            }
        }

        return true;
    }
}