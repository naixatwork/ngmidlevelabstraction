import {Component, OnInit} from '@angular/core';
import {FormControlAdapter} from "../FormControlAdapter";
import {FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-full-name-controller',
  templateUrl: './full-name-controller.component.html',
  styleUrls: ['./full-name-controller.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FullNameControllerComponent,
      multi: true
    }
  ]
})
export class FullNameControllerComponent extends FormControlAdapter implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {
    super(
      formBuilder.group({
        first: [''],
        last: [''],
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.subscribeAll)).subscribe((value) => {
      console.log(value)
    })
  }
}
