import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginService {

  constructor(private router: Router ,private authenticationService:AuthenticationService) { }
  canActivate(): Observable<boolean> {
     return this.authenticationService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
      console.log(isAuthenticated)
        if (isAuthenticated) {
					// Directly open inside area
				   this.router.navigateByUrl('/', { replaceUrl: true });
          return false;

				} else {
					// Simply allow access to the login
					return true;
				}

      })
    );
  }}
