import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public menu: MenuController,
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
    this.loginForm = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)],),
      password: this.fb.control('', [Validators.required])
    });
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  login() {
    if(this.loginForm.valid) {
      // this.loading.showLoader();
      this.authService.authenticate(this.loginForm.value.cpf, this.loginForm.value.password).subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));

        // this.loading.hideLoader()
        
        this.navCtrl.navigateRoot('/');
      });
    }

  }
}
