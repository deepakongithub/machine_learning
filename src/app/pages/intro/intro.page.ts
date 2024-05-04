import { Component, OnInit, ViewChild } from '@angular/core';
import { INTRO_KEY } from 'src/app/guards/intro.service';
   
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})

export class IntroPage implements OnInit {
    visited:any;
   constructor() { }

  ngOnInit() {
  }
  async start() {
    
		await localStorage.setItem(INTRO_KEY,"true");
    const hasSeenIntro =  localStorage.getItem(INTRO_KEY);
     this.visited = hasSeenIntro;
		//this.router.navigateByUrl('/login', { replaceUrl: true });
	}
}
