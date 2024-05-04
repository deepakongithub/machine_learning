import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
 import { HttpClient } from '@angular/common/http';
 const TOKEN_KEY = 'my-token';

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

	login(credentials: { email:any; password:any }): Observable<any> {
		return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
			map((data: any) => data.token),
			switchMap((token) => {
         localStorage.setItem(TOKEN_KEY,token)
				return from(token);
			}),
			tap((_) => {
				this.isAuthenticated.next(true);
			})
		);
	}

	logout(): void {
		this.isAuthenticated.next(false);
		localStorage.removeItem(TOKEN_KEY);
    return    
	}
 
}
