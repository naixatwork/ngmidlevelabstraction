import {ControlValueAccessor, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Component, OnDestroy} from "@angular/core";

@Component({
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class DynamicFormControl implements ControlValueAccessor, OnDestroy {
  private _form?: FormGroup;

  protected subscribeAll: Subject<null>;

  public get form(): FormGroup {
    if (!this._form) {
      throw Error(`from ${DynamicFormControl.name}, form has not been initialized`);
    }
    return this._form;
  }

  protected set form(newForm: FormGroup) {
    this._form = newForm;
    this.callRegisteredFunctions();
  }

  public touched = false;
  private onChange = (value: object) => {
  };
  private onTouched = () => {
  };

  protected constructor(newForm: FormGroup) {
    this.subscribeAll = new Subject<null>();
    this.form = newForm;
  }

  private callRegisteredFunctions(): void {
    this.form.valueChanges.pipe(takeUntil(this.subscribeAll)).subscribe((value) => {
      this.onChange(value);
      this.markAsTouched();
    })
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  registerOnChange(callbackFunction: () => never): void {
    this.onChange = callbackFunction;
  }

  registerOnTouched(callbackFunction: () => never): void {
    this.onTouched = callbackFunction;
  }

  writeValue(value: object): void {
    this.form.patchValue(value || {});
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    this.subscribeAll.next(null);
    this.subscribeAll.complete();
  };
}
