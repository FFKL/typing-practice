import * as t from "runtypes";

const PASSWORD_PATTERN = /^\w{4,}$/;

export const Password = t.String
  .withConstraint(s => new RegExp(PASSWORD_PATTERN).test(s) || `'${s}' is not a valid password`, { name: 'ValidPassword' })
  .withBrand('Password');

export type Password = t.Static<typeof Password>;
