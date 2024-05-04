import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutoLoginService } from './auto-login.service';

export const autoLoginGuard: CanActivateFn = () => {
    const auutoLoginService = inject(AutoLoginService);
    return auutoLoginService.canActivate();
    };
