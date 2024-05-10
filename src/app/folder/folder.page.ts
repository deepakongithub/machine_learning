import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public users?: User[];
  
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private userService:UserService
    ) {
      
    }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    switch (this.folder) {
      case "users":
        setTimeout(() => {
          this.getUsers();

        }, 2000);
        break; 
      default:
        this.users=[];
        break;
    }
  }
  async logout() {
		this.authService.logout();
		this.router.navigateByUrl('/login', { replaceUrl: true });
	}
  getUsers():void{
    this.userService.list().subscribe(res=>{
      console.log(this.users =res)
    })

  }
}
