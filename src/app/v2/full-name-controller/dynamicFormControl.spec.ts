import {DynamicFormControl} from "./dynamicFormControl"
import {FormControl, FormGroup, Validators} from "@angular/forms";

describe("DynamicFormControl", () => {
  class MockDynamicFormControl extends DynamicFormControl {
    constructor() {
      super(new FormGroup({}));
    }
  }

  const dynamicForm = new MockDynamicFormControl();

  it('should create', () => {
    expect(dynamicForm).toBeTruthy();
  })

  it('should create with a form', () => {
    expect(dynamicForm.form).toBeTruthy();
  })

  it('should have a form with no controls', () => {
    expect(dynamicForm.form.controls).toEqual({});
  })
})

describe("Form's features of DynamicFormControl", () => {
  class MockDynamicFormControl extends DynamicFormControl {
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

  it('should have a "test" control', () => {
    expect(control).toBeTruthy();
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

  it('should be touched if control is touched', () => {
    control.setValue(seed);
    expect(control.touched).toBeTrue();
    expect(form.touched).toBeTrue();
  })
})
