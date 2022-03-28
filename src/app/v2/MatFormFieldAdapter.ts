import {MatFormFieldControl} from "@angular/material/form-field";
import {FormGroup, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {Directive, ElementRef, HostBinding, Injector, Input, OnDestroy} from "@angular/core";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from '@angular/cdk/coercion'
import {FormControlAdapter} from "./FormControlAdapter";

@Directive()
export abstract class MatFormFieldAdapter<T> implements MatFormFieldControl<T>, OnDestroy {
  public get form(): FormGroup {
    return this.formControlAdapter.form;
  }

  private static nextId = 0;
  @HostBinding() readonly id = `${this.controlType}-${MatFormFieldAdapter.nextId++}`;

  readonly stateChanges = new Subject<void>();

  get value() {
    return this.form.value;
  }

  set value(value: T) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }

  private _placeholder = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  focused = false;

  get empty() {
    for (const value of Object.values(this.form.value)) {
      if (!!value) {
        return false
      }
    }
    return true;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

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
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.form.invalid;
  }

  @Input() userAriaDescribedBy = '';

  // dependencies
  private focusMonitor: FocusMonitor;
  private elementElementRef: ElementRef<HTMLFormElement>;
  public ngControl: NgControl;

  protected constructor(
    public readonly controlType: string,
    private readonly formControlAdapter: FormControlAdapter,
    injector: Injector,
  ) {
    {
      this.ngControl = injector.get(NgControl);
      this.ngControl.valueAccessor = formControlAdapter;
    }
    {
      this.focusMonitor = injector.get(FocusMonitor);
      this.elementElementRef = injector.get(ElementRef);
    }
    {
      this.focusMonitor.monitor(this.elementElementRef.nativeElement, true).subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    }
  }

  setDescribedByIds(ids: string[]): void {
    // todo(accessibility): ids returns an empty string it doesnt work
    this.userAriaDescribedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementElementRef.nativeElement);
    this.stateChanges.complete()
  }
}
