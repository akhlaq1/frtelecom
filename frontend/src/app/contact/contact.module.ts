import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaSettings, RECAPTCHA_SETTINGS, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { environment } from '../../environments/environment'
import { ContactService } from '../services/contact.service';
import { ContactComponent } from './contact.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { NumberOnlyDirective } from "./directives/number-only.directive";

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  declarations: [ContactComponent, GooglePlacesDirective, NumberOnlyDirective],
  providers: [
    ContactService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.reCaptchaSiteKey } as RecaptchaSettings
    }
  ]
})
export class ContactModule { }
