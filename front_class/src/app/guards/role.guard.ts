import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const requiredRole = route.data?.['role'];
    if (this.authService.getTipo() === requiredRole) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
