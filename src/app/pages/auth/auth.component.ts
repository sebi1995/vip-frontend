import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  //  variables start
  loginForm: FormGroup;
  error: any;
  //  variable end
  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    // for login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$'),
          Validators.required,
        ],
      ],
    });
    // this.authService.login();
  }

  loginFn() {
    this.error = undefined;
    const formValue = this.loginForm.value;
    console.log(formValue);
    this.authService.login(formValue).subscribe(
      ({ data }) => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      err => {
        this.error = 'Invalid credentials';
        console.log(err);
      }
    );
  }
}
