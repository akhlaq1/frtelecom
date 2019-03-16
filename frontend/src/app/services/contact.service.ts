import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  reCaptchaSiteKey;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }


  contactSubmit(formData: any) {
    return this.http.post(environment.apiBaseUrl + '/contact_submit', formData, this.noAuthHeader);
  }


  contactMessageSubmit(formData: any) {
    return this.http.post(environment.apiBaseUrl + '/contact_message_submit', formData, this.noAuthHeader);
  }

  getInterestData() {
    return this.http.get(environment.apiBaseUrl + '/interests');
  }

  getReCaptchaKey() {
    return environment.reCaptchaSiteKey;
  }
}
