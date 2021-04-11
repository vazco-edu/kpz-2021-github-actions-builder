export type Result<T> = { ok: true; value: T } | { ok: false; message: string };

export interface ExpectedObj {
  foo: string;
  bar: number;
  baz: boolean;
}
