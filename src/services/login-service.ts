import type { Email } from '../entities/email';
import type { Password } from '../entities/password';
import type { User } from '../entities/user';
import UserService from './user-service';

export default class LoginService {
  constructor(private readonly userService: UserService) { }

  public async login(email: Email, password: Password): Promise<User> {
    const foundUser = await this.userService.findUser(email, password);
    this.assertUserExistence(foundUser);

    return foundUser;
  }

  private assertUserExistence(maybeUser: User | undefined): asserts maybeUser is User {
    if (!maybeUser) {
      throw new Error('Invalid email or password');
    }
  }
}
