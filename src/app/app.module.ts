import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DoubleTextComponent } from './components/form/double-text/double-text.component';
import { RangePickerComponent } from './components/form/range-picker/range-picker.component';
import { FullNameControllerComponent } from './v2/full-name-controller/full-name-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    DoubleTextComponent,
    RangePickerComponent,
    FullNameControllerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
