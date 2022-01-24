import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      fullName: ['', Validators.required],
      bachelorPeriod: ['', Validators.required],
      militaryServicePeriod: ['', Validators.required],
      dastan: [{value: null}, Validators.required],
    })
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(console.log)

    // setTimeout(() => {
    //   this.formGroup.controls['dastan'].enable();
    // }, 2000)
  }

}
