import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private userService:UserService
    ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.users();
  }
  async logout() {
		this.authService.logout();
		this.router.navigateByUrl('/login', { replaceUrl: true });
	}
  users(){
    console.log(this.userService)
    this.userService.list().subscribe(res=>{
      console.log(res)
    })

  }
}
