import {CustomFormGroup} from "./CustomFormGroup";
import {FormControl} from "@angular/forms";

export abstract class CustomFormGroupDecorator extends CustomFormGroup {
  protected customFormGroup!: CustomFormGroup;

  constructor(customFormGroup: CustomFormGroup, formControlName: string) {
    super();
    this.customFormGroup = customFormGroup;
    this.assignNewFormControl(formControlName);
  }

  protected assignNewFormControl(name: string): void {
    this.customFormGroup.formGroup.setControl(name, new FormControl(''))
  }
}
