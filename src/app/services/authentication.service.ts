import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
 import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 const TOKEN_KEY = environment.TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token = '';
  constructor(private http: HttpClient) {
		this.loadToken();
	}

	 loadToken() {
		const token =   localStorage.getItem(TOKEN_KEY);
		if (token) {
			console.log('set token: ', token);
			this.token = token;
			this.isAuthenticated.next(true);
		} else {
			this.isAuthenticated.next(false);
		}
	}

	login(credentials: { username:any; password:any },): Observable<HttpResponse<any>> {
		return this.http.post<any>(environment.SERVER_URL+`/api/auth/login`, credentials,{ observe: 'response' })
	}

	logout(): void {
		this.isAuthenticated.next(false);
		localStorage.removeItem(TOKEN_KEY);
       return    
	}
 
}
