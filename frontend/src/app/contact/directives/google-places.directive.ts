import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
declare const google: any;

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }


  getFormattedAddress(place: any) {
    let location_obj = {};
    for (let i in place.address_components) {
      let item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address;
      if (item['types'].indexOf("locality") > -1) {
        location_obj['city'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['state'] = item['short_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['address1'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['address2'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['zipCode'] = item['short_name']
      }

    }
    return location_obj;
  }

}
