type Constructor<T = {}> = new (...args: any[]) => T;

export function withExtend<T extends Constructor>(base: T = class {
} as any) {
  return class extends base {
  };
}
