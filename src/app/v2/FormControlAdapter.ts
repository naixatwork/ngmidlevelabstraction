import {ControlValueAccessor, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Component, OnDestroy} from "@angular/core";

@Component({
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class FormControlAdapter implements ControlValueAccessor, OnDestroy {
  protected subscribeAll: Subject<null>;

  public get form(): FormGroup {
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

  protected constructor(protected _form: FormGroup) {
    this.subscribeAll = new Subject<null>();
    this.callRegisteredFunctions();
  }

  private callRegisteredFunctions(): void {
    console.log('called')
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
