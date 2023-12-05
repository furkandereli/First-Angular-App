import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user.pipe(
    map(user => {
      return !!user && user.email == environment.adminEmail;
    }),
    tap(isAdmin => {
      if(!isAdmin){
        router.navigate(['/auth']);
      }
    })

  )

};
