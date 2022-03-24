import {Component, ElementRef, HostBinding, Injector, OnInit, Optional, Self} from '@angular/core';
import {FormBuilder, NgControl} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material/form-field";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatFormFieldAdapter} from "../MatFormFieldAdapter";
import {FormControlAdapter} from "../FormControlAdapter";

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
    private readonly injector: Injector
  ) {
    super(
      'full-name-controller',
      // todo(medium): create builder for this
      new FormControlAdapter(formBuilder.group({first: '', last: ''})),
      injector
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      // console.log(value)
    })
  }
}
