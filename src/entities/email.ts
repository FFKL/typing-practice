import * as t from "runtypes";

const EMAIL_PATTERN = /^[a-zA-Z1-9._]+@example\.com$/;

export const Email = t.String
  .withConstraint(s => new RegExp(EMAIL_PATTERN).test(s) || `'${s}' is not a valid email`, { name: 'ValidEmail' })
  .withBrand('Email');

export type Email = t.Static<typeof Email>;
