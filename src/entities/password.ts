export class Password {
  private static PASSWORD_PATTERN = /^\w{4,}$/g;

  static from(candidate: string): Password {
    const isValidPassword = this.PASSWORD_PATTERN.test(candidate);
    if (isValidPassword) {
      return new Password(candidate);
    }
    throw new TypeError('String is not Password');
  }

  private readonly _type = Symbol('Password');

  protected constructor(public readonly value: string) { };
}