import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = this.accountService.token;
        const isLoggedIn = this.accountService.isAuthenticated;
       // const isApiUrl = request.url.startsWith(environment.SERVER_URL);
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { 
                    'Accept': `application/json`,
                    'Content-Type': `application/json`,
                    'Access-Control-Allow-Origin': `*`,
                    Authorization: `Bearer ${token}`
                     }
                
                
            });
        }

        return next.handle(request);
    }
}