import {Component, ElementRef, HostBinding, OnInit, Optional, Self} from '@angular/core';
import {FormBuilder, NgControl} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatFormFieldAdapter} from "../MatFormFieldAdapter";

@Component({
  selector: 'app-full-name-controller',
  templateUrl: './full-name-controller.component.html',
  styleUrls: ['./full-name-controller.component.scss'],
  providers: [
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
    focusMonitor: FocusMonitor,
    elementElementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public override ngControl: NgControl,
  ) {
    super(
      formBuilder.group({
        first: [''],
        last: [''],
      }),
      focusMonitor,
      elementElementRef,
      ngControl
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      // console.log(value)
    })
  }
}
