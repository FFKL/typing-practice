import * as t from "runtypes";

export const Password = t.String
  .withConstraint(s => s.length >= 4 || `'${s}' is not a valid password`, { name: 'ValidPassword' })
  .withBrand('Password');

export type Password = t.Static<typeof Password>;
