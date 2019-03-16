import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  loadAPI: Promise<any>;
  interestData: Array<any>;
  contactInterest: Array<any>;

  contactForm: FormGroup;
  loading: boolean = false;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  address = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      title: null,
      fax: null,
      address: null,
      businessPhone: [null, [Validators.required, Validators.minLength(5)]],
      cellPhone: [null, [Validators.required, Validators.minLength(5)]],
      companyname: null,
      email: [null, [Validators.required, Validators.email]],
      recaptchaReactive: [null, [Validators.required]],
      message: null
    });

    this.contactService.getInterestData().subscribe(res => {
      this.interestData = res['data'];
      this.contactForm.addControl("interest", this.fb.array(this.interestData.map(x => !1)));
    }, err => {
      console.log(err);
    });
  }

  getInterest(interestArr) {
    let arr = [];
    for (let i = 0; i < interestArr.length; i++) {
      const element = interestArr[i];
      if (element) {
        arr.push(this.interestData[i]._id);
      }
    }
    return arr;
  }

  getRecapCha() {
    return this.contactService.getReCaptchaKey();
  }

  onSubmit(el: HTMLElement) {
    CoreService.markAsDirty(this.contactForm);
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      formData.interest = this.getInterest(this.contactForm.value.interest);
      formData.address1 = this.address.address1;
      formData.address2 = this.address.address2;
      formData.city = this.address.city;
      formData.state = this.address.state;
      formData.zipCode = this.address.zipCode;
      this.loading = true;
      this.contactService.contactSubmit(formData).subscribe(res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.contactForm.reset();
        this.serverErrorMessages = "";
        this.loading = false;
        el.scrollIntoView();
      }, err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error;
        } else {
          this.serverErrorMessages = 'Something went wrong !';
        }
        this.loading = false;
        el.scrollIntoView();
      });
    }
  }

  setAddress(address) {
    this.address = address;
  }


  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['https://www.google.com/recaptcha/api.js'];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

}
