import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initThree } from "../../assets/js/three-image-transition";
import { UserService } from '../services/user.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  serverErrorMessages: string;
  signInForm: FormGroup;
  loading: boolean = false;

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }

    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngAfterViewInit() {
    initThree();
  }

  onSubmit() {
    CoreService.markAsDirty(this.signInForm);
    if (this.signInForm.valid) {
      this.loading = true;
      this.userService.login(this.signInForm.value).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        err => {
          this.serverErrorMessages = err.error.message;
          this.loading = false;
        }
      );
    }
  }

}
