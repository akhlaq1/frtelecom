import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  public static markAsDirty(form: FormGroup) {
    for (const control in form.controls) {
      form.controls[control].markAsDirty();
    }
  }
}
