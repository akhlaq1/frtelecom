import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { CoreService } from '../services/core.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  contactForm: FormGroup;
  loading: boolean = false;

  constructor(private contactService: ContactService, private fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      fullName: "",
      cellPhone: "",
      email: "",
      message: ""
    });
  }

  onSubmit() {
    this.loading = true;
    this.contactService.contactMessageSubmit(this.contactForm.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.contactForm.reset();
        this.serverErrorMessages = "";
        this.loading = false;
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error;
        } else {
          this.serverErrorMessages = 'Something went wrong !';
        }
        this.loading = false;
      }
    );
  }
}
