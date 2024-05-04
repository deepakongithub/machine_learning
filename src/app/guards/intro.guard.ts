import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { IntroService } from './intro.service';

 export const introGuard: CanActivateFn = () => {
  const introService = inject(IntroService);
  return introService.canActivate();
  };
