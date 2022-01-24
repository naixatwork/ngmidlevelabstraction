import {ControlValueAccessor, FormGroup} from "@angular/forms";

export abstract class CustomFormGroup implements ControlValueAccessor {
  public formGroup: FormGroup = new FormGroup({});
  public onChange = (value: any) => {
  };
  public onTouched = () => {
  };
  public touched = false;

  protected constructor() {
    this.initOnChange();
  }

  private initOnChange(): void {
    this.formGroup.valueChanges.subscribe((value) => {
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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.formGroup.patchValue(obj || '');
  }
}
