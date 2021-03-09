export class Email {
  private static EMAIL_PATTERN = /^[a-zA-Z1-9._]+@example\.com$/;

  static from(candidate: string): Email {
    const isValidEmail = new RegExp(this.EMAIL_PATTERN).test(candidate);
    if (isValidEmail) {
      return new Email(candidate);
    }
    throw new TypeError('String is not a valid email');
  }

  private readonly _type = Symbol('Email');

  protected constructor(public readonly value: string) { }
}