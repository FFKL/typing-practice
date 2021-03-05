export class Email {
  static EMAIL_PATTERN = /^\w+@example\.com$/;

  static of(candidate: string): Email {
    const isValidEmail = this.EMAIL_PATTERN.test(candidate);
    if (isValidEmail) {
      return new Email(candidate);
    }
    throw new TypeError('String is not Email');
  }

  private readonly _type = Symbol('Email');

  protected constructor(public readonly value: string) { }
}