import {MatFormFieldControl} from "@angular/material/form-field";
import {FormGroup, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {Component, Directive, ElementRef, HostBinding, Input, OnDestroy, Optional, Self} from "@angular/core";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from '@angular/cdk/coercion'

@Directive()
export abstract class MatFormFieldAdapter<T> implements MatFormFieldControl<T>, OnDestroy {
  public get form(): FormGroup {
    return this._form;
  }

  private static nextId = 0;
  controlType = 'abstract-mat-form-field';
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

  protected constructor(
    private _form: FormGroup,
    private focusMonitor: FocusMonitor,
    private elementElementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    focusMonitor.monitor(elementElementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
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
