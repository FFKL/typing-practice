import { PrivilegedUser } from '../entities/privileged-user';
import { Role } from '../entities/role';
import UserService from './user-service';

export default class LoginService {
  constructor(private readonly userService: UserService) {}
  // TODO: Try to define better types
  public async login(email: string, password: string): Promise<PrivilegedUser> {
    const users = await this.userService.getAllUsers();
    const loggedInUser = users.find(user => user.email === email && user.password === password);
    if (!loggedInUser) {
      throw new Error('Invalid email or password');
    }
    if (loggedInUser.role === Role.CLIENT) {
      throw new Error('Access denied!');
    }

    return loggedInUser;
  }
}
