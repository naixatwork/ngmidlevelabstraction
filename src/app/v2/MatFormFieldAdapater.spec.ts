import {MatFormFieldAdapter} from "./MatFormFieldAdapter";
import {FormBuilder, FormsModule, NgControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Component, Injector} from "@angular/core";
import {FormControlAdapter} from "./FormControlAdapter";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";

interface DummyValue {
  dummy: string,
  dummy2: string
}

@Component({
  template: '' +
    '<form [formGroup]="form">' +
    '<input matInput test-dummy formControlName="dummy" />' +
    '<input matInput formControlName="dummy2" />' +
    '</form>' +
    '',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: MockMaterialFormControl,
      multi: true
    },
  ]
})
  // eslint-disable-next-line @angular-eslint/component-class-suffix
class MockMaterialFormControl extends MatFormFieldAdapter<DummyValue> {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly injector: Injector,
  ) {
    super(
      'mock',
      new FormControlAdapter(formBuilder.group({
        dummy: [''],
        dummy2: ''
      })),
      injector
    );
  }
}

describe("MatFormFieldAdapter", () => {
  let component: MockMaterialFormControl;
  let fixture: ComponentFixture<MockMaterialFormControl>;
  const mockNgControl = jasmine.createSpyObj('NgControl', ['value', 'valueAccessor'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule],
      declarations: [MockMaterialFormControl],
      providers: [
        {provide: NgControl, useValue: mockNgControl}
      ]
    });
    fixture = TestBed.createComponent(MockMaterialFormControl);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  })

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  })

  it('should have ngControl with it\'s valueAccessor as FormControlAdapter', () => {
    expect(component.ngControl).toBeDefined();
    expect(component.ngControl.valueAccessor).toBeInstanceOf(FormControlAdapter);
  })

  it('should change the focused state upon focusing on the control\'s DOM', () => {
    const {nativeElement} = fixture.debugElement;
    const control = nativeElement.querySelector('[test-dummy]')
    control.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(component.focused).toBeTruthy();
  })

  it('should have a form that is equal to FormControlAdapter.form', () => {
    const {form, formControlAdapter} = component;
    expect(form).toEqual(formControlAdapter.form);
  })

  it('should have it\'s value bound to FormControlAdapter.form.value ', () => {
    const {formControlAdapter} = component;
    formControlAdapter.form.patchValue({
      dummy: 'dummy-text',
      dummy2: 'dummy-text',
    })
    fixture.detectChanges();
    expect(component.value).toEqual(formControlAdapter.form.value)
  })

  it('should have FormControlAdapter.form.value change when setting value', () => {
    const {formControlAdapter} = component;
    const dummyObject: DummyValue = {
      dummy: 'dummy-text',
      dummy2: 'dummy-text',
    }
    component.value = {...dummyObject};
    expect(formControlAdapter.form.value).toEqual({...dummyObject})
  })

  it('should have empty as true by default', () => {
    expect(component.empty).toBeTrue();
  })

  it('should have empty as false if value is not empty', () => {
    const dummyObject: DummyValue = {
      dummy: 'dummy-text',
      dummy2: 'dummy-text',
    }
    component.value = {...dummyObject};
    expect(component.empty).toBeFalse();
  })

  it('should have a shouldLabelFloat property and it should be false by default', () => {
    expect(component.shouldLabelFloat).toBeFalse();
  })

  it('should float the label if it\'s being focused on', () => {
    const {nativeElement} = fixture.debugElement;
    const control = nativeElement.querySelector('[test-dummy]')
    control.dispatchEvent(new Event('focus'));
    expect(component.shouldLabelFloat).toBeTrue();
  })

  it('should float the label if it\'s not empty', () => {
    const dummyObject: DummyValue = {
      dummy: 'dummy-text',
      dummy2: 'dummy-text',
    }
    component.value = {...dummyObject};
    expect(component.shouldLabelFloat).toBeTrue();
  })

  it('should have disabled as false by default', () => {
    const {disabled} = component;
    expect(disabled).toBeFalse();
  })

  it('should have it\'s disabled bound to form.disabled', () => {
    const {form} = component;
    component.disabled = true;
    expect(form.disabled).toBeTrue();
  })

  it('should should bind errorState to form.invalid', function () {
    const {errorState, form} = component;
    expect(errorState).toBeDefined();
    expect(errorState).toEqual(form.invalid);
    form.setErrors({dummy: true})
    expect(component.errorState).toEqual(form.invalid);
  });
});
