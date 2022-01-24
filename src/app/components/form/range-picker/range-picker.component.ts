import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomFormGroup} from "../CustomFormGroup";
import {ConcreteTextDecorator} from "../TextDecorator";

@Component({
  selector: 'app-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangePickerComponent),  // replace name as appropriate
      multi: true
    },
  ]

})
export class RangePickerComponent extends CustomFormGroup implements ControlValueAccessor {
  constructor() {
    super();
    new ConcreteTextDecorator(this, 'from');
    new ConcreteTextDecorator(this, 'to');
  }
}
