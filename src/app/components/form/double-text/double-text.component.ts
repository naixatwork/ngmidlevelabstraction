import {Component, forwardRef} from '@angular/core';
import {CustomFormGroup} from "../CustomFormGroup";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ConcreteTextDecorator} from "../TextDecorator";

@Component({
  selector: 'app-double-text',
  templateUrl: './double-text.component.html',
  styleUrls: ['./double-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DoubleTextComponent),  // replace name as appropriate
      multi: true
    },
  ]
})
export class DoubleTextComponent extends CustomFormGroup implements ControlValueAccessor {
  constructor() {
    super();
    new ConcreteTextDecorator(this, 'firstname');
    new ConcreteTextDecorator(this, 'lastname');
    new ConcreteTextDecorator(this, 'suffix');
  }
}
