import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
  

export const INTRO_KEY = 'intro-seen';


@Injectable({
  providedIn: 'root'
})
export class IntroService {

  constructor(private router: Router) { }
  canActivate(): boolean {
    const hasSeenIntro =  localStorage.getItem(INTRO_KEY);
    console.log(hasSeenIntro)
    if (hasSeenIntro && (hasSeenIntro === 'true')) {
      alert("Into Done")
      return false;
  
    } else {
       return true;
    }}

    
}
