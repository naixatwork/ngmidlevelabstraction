import {MatFormFieldControl} from "@angular/material/form-field";
import {FormControl, FormGroup, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {Directive, ElementRef, HostBinding, Injector, Input, OnDestroy} from "@angular/core";
import {FocusMonitor, FocusOrigin} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from '@angular/cdk/coercion'
import {FormControlAdapter} from "./FormControlAdapter";
import {By} from "@angular/platform-browser";
import {isObjectEmpty} from "../shared/functions/isObjectEmpty/isObjectEmpty.func";

@Directive()
export abstract class MatFormFieldAdapter<T> implements MatFormFieldControl<T>, OnDestroy {
  public get form(): FormControlAdapter['form'] {
    return this.formControlAdapter.form;
  }

  focused = false;

  private static createdCounter = 0;

  get empty() {
    return isObjectEmpty(this.form.value)
  }

  @HostBinding() readonly id = `${this.controlType}-${MatFormFieldAdapter.createdCounter}`;

  readonly stateChanges = new Subject<void>();

  get value(): T {
    return this.form.value;
  }

  set value(value: T) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }

  // todo(med): make placeholder accept objects instead of a string
  private _placeholder = '';
  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  // todo(med): make placeholder accept objects instead of a string
  private _required = false;
  @Input()
  get required() {
    return this._required;
  }

  set required(isRequired) {
    this._required = coerceBooleanProperty(isRequired);
    this.stateChanges.next();
  }

  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    setFormsDisableState.call(this);
    this.stateChanges.next();

    function setFormsDisableState(this: MatFormFieldAdapter<T>) {
      this._disabled ? this.form.disable() : this.form.enable();
    }
  }

  get errorState(): boolean {
    return this.form.invalid;
  }

  @Input() userAriaDescribedBy = '';

  private focusMonitor!: FocusMonitor;
  private elementRef!: ElementRef<HTMLFormElement>;
  public ngControl!: NgControl;

  protected constructor(
    public readonly controlType: string,
    public readonly formControlAdapter: FormControlAdapter,
    injector: Injector,
  ) {
    const setNgControl = () => {
      this.ngControl = injector.get(NgControl);
    };

    const setFocusMonitor = () => {
      this.focusMonitor = injector.get(FocusMonitor);
    };

    const setFormControlAdapterAsValueAccessor = () => {
      this.ngControl.valueAccessor = formControlAdapter;
    };

    const setElementRef = () => {
      this.elementRef = injector.get(ElementRef);
    };

    const monitorIfElementIsBeingFocusedOn = () => {
      const setFocusedAndChangeState = (value: FocusOrigin): void => {
        this.focused = !!value;
        this.stateChanges.next();
      }

      this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(setFocusedAndChangeState);
    };

    setNgControl();
    setFocusMonitor();
    setElementRef();
    setFormControlAdapterAsValueAccessor();
    monitorIfElementIsBeingFocusedOn();
    this.increaseNumberOfTimesThisClassHasCreated();
  }

  private increaseNumberOfTimesThisClassHasCreated(): void {
    MatFormFieldAdapter.createdCounter++;
  }

  setDescribedByIds(ids: string[]): void {
    // todo(accessibility): ids returns an empty string it doesnt work
    this.userAriaDescribedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    // todo(high): implement the function
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.stateChanges.complete()
  }
}
