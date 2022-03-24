import {MatFormFieldAdapter} from "./MatFormFieldAdapter";
import {FormBuilder} from "@angular/forms";
import {Injector} from "@angular/core";
import {FormControlAdapter} from "./FormControlAdapter";

interface DummyValue {
  dummy: string,
  dummy2: string
}

describe("MatFormFieldAdapter", () => {
  class MockMaterialFormControl extends MatFormFieldAdapter<DummyValue> {
    constructor(
      private readonly formBuilder: FormBuilder,
      private readonly injector: Injector
    ) {
      super(
        'mock',
        new FormControlAdapter(formBuilder.group({dummy: '', dummy2: ''})),
        injector
      );
    }
  }
});
