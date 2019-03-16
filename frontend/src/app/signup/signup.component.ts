import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  signUpForm: FormGroup;
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }

    this.signUpForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: null,
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });

  }

  onSubmit() {
    CoreService.markAsDirty(this.signUpForm);
    if (this.signUpForm.valid) {
      this.loading = true;
      this.userService.postUser(this.signUpForm.value).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.signUpForm.reset();
          this.serverErrorMessages = "";
          this.loading = false;
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error;
          }
          else {
            this.serverErrorMessages = 'Something went wrong, Please contact admin.';
          }
          this.loading = false;
        }
      );
    }
  }
}
