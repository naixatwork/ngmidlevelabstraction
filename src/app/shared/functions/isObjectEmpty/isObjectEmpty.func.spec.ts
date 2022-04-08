import {isObjectEmpty} from "./isObjectEmpty.func";

describe("isObjectEmpty", () => {
  it("shouldn't return undefined", () => {
    expect(isObjectEmpty({})).toBeDefined();
  })

  it('should return true with {}', () => {
    expect(isObjectEmpty({})).toBeTrue();
  });

  it('should return true with object with keys and noe values', () => {
    const seed = {
      dummy: '',
      dummy2: ''
    }
    expect(isObjectEmpty(seed)).toBeTrue();
  });

  it('should return false with object that has some values', () => {
    const seed = {
      dummy: 'value',
      dummy2: ''
    }
    expect(isObjectEmpty(seed)).toBeFalse();
  });

  it('should return false with object full of values', () => {
    const seed = {
      dummy: 'value',
      dummy2: 'value'
    }
    expect(isObjectEmpty(seed)).toBeFalse();
  });
})
