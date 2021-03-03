import { User } from '../entities/user';
import UserService from './user-service';

export default class LoginService {
  constructor(private readonly userService: UserService) {}
  // TODO: Try to define better types
  public async login(email: string, password: string): Promise<User> {
    const users = await this.userService.getAllUsers();
    const loggedInUser = users.find(user => user.email === email && user.password === password);
    if (!loggedInUser) {
      throw new Error('Invalid email or password');
    }

    return loggedInUser;
  }
}
