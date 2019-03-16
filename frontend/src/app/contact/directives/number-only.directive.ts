import { Directive, ElementRef, OnInit } from '@angular/core';
import InputMask from "inputmask";

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective implements OnInit {
  private element: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    InputMask({ regex: "[0-9]*" }).mask(this.element);
  }

}
