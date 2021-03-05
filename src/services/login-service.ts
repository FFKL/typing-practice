import { Admin } from '../entities/admin';
import { Moderator } from '../entities/moderator';
import { PrivilegedUser } from '../entities/privileged-user';
import { User } from '../entities/user';
import UserService from './user-service';

export default class LoginService {
  constructor(private readonly userService: UserService) { }
  public async login(email: string, password: string): Promise<PrivilegedUser> {
    const users = await this.userService.getAllUsers();

    const authenticateUser = (user: User): boolean => user.email === email && user.password === password;
    const loggedInUser = users.find(authenticateUser);

    this.assertUserExistence(loggedInUser);
    this.assertPrivilegedUser(loggedInUser);

    return loggedInUser;
  }

  private assertUserExistence(maybeUser: User | undefined): asserts maybeUser is User {
    if (!maybeUser) {
      throw new Error('Invalid email or password');
    }
  }

  private assertPrivilegedUser(user: User): asserts user is PrivilegedUser {
    if (user instanceof Admin || user instanceof Moderator) {
      return;
    }
    throw new Error('Access denied!');
  }
}
