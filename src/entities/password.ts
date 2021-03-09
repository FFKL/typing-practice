export class Password {
  private static PASSWORD_PATTERN = /^\w{4,}$/;

  static from(candidate: string): Password {
    const isValidPassword = new RegExp(this.PASSWORD_PATTERN).test(candidate);
    if (isValidPassword) {
      return new Password(candidate);
    }
    throw new TypeError('String is not a valid password');
  }

  private readonly _type = Symbol('Password');

  protected constructor(public readonly value: string) { };
}