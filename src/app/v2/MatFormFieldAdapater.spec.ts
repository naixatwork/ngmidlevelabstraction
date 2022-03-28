import {MatFormFieldAdapter} from "./MatFormFieldAdapter";
import {FormBuilder, FormsModule, NgControl, ReactiveFormsModule} from "@angular/forms";
import {Component, DebugElement, Injector} from "@angular/core";
import {FormControlAdapter} from "./FormControlAdapter";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";

interface DummyValue {
  dummy: string,
  dummy2: string
}

describe("MatFormFieldAdapter", () => {
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
        new FormControlAdapter(formBuilder.group({dummy: '', dummy2: ''})),
        injector
      );
    }
  }

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
});
