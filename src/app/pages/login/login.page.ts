import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
const TOKEN_KEY = environment.TOKEN_KEY;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials: FormGroup;
	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {
		this.credentials = this.fb.group({
			username: ['test@test.com', [Validators.required, Validators.email]],
			password: ['aaa', [Validators.required, Validators.minLength(3)]]
		});
	}

	ngOnInit() {

	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.authService.login(this.credentials.value).subscribe(
			async (res) => {
 				const token: any = res.headers.get("authorization");
				localStorage.setItem(TOKEN_KEY, token)

				this.authService.isAuthenticated.next(true);
				this.authService.loadToken();
				await loading.dismiss();

				this.router.navigateByUrl('/', { replaceUrl: true });

			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: res.status,
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
}
