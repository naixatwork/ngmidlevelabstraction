export function isObjectEmpty(object: object) {
  for (const value of Object.values(object)) {
    if (!!value) {
      return false
    }
  }
  return true;
}
