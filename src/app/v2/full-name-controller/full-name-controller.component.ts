import {Component, ElementRef, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";
import {FocusMonitor} from "@angular/cdk/a11y";
import {FormControlAdapter} from "../FormControlAdapter";
import {MatFormFieldAdapter} from "../MatFormFieldAdapter";

@Component({
  selector: 'app-full-name-controller',
  templateUrl: './full-name-controller.component.html',
  styleUrls: ['./full-name-controller.component.scss'],
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: FullNameControllerComponent,
    //   multi: true
    // },
    {
      provide: MatFormFieldControl,
      useExisting: FullNameControllerComponent,
      multi: true
    }
  ]
})
export class FullNameControllerComponent extends MatFormFieldAdapter<any> implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementElementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public _ngControl: NgControl,
  ) {
    super(
      formBuilder.group({
        first: [''],
        last: [''],
      }),
      _focusMonitor,
      _elementElementRef,
      _ngControl
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      // console.log(value)
    })
  }
}
