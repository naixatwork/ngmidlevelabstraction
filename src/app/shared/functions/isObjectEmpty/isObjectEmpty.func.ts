export function isObjectEmpty(object: Object) {
  for (const value of Object.values(object)) {
    if (!!value) {
      return false
    }
  }
  return true;
}
