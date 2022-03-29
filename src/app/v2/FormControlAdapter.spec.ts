import {FormControlAdapter} from "./FormControlAdapter"
import {FormControl, FormGroup, Validators} from "@angular/forms";

describe("FormControlAdapter", () => {
  class MockDynamicFormControl extends FormControlAdapter {
    constructor() {
      super(
        new FormGroup({
          test: new FormControl('', [Validators.required])
        })
      );
    }
  }

  const dynamicForm = new MockDynamicFormControl();
  const {form} = dynamicForm;
  const control = form.controls['test'];
  let seed: number;

  beforeEach(() => {
    seed = Math.random();
  })

  beforeEach(() => {
    form.setValue({test: ''})
  })

  it('should create', () => {
    expect(dynamicForm).toBeDefined();
  })

  it('should create with a form', () => {
    expect(dynamicForm.form).toBeTruthy();
  })

  it('should have a "test" control', () => {
    expect(control).toBeInstanceOf(FormControl);
  })

  it('should update the value on control\'s value change', () => {
    control.setValue(seed);
    expect(form.value).toEqual({test: seed})
  })

  it('should patch value', () => {
    form.patchValue({test: seed})
    expect(form.value).toEqual({test: seed})
  })

  it('should be invalid if control is invalid', () => {
    expect(form.invalid).toBeTrue();
  })
})
