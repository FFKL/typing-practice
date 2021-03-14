import { Role } from '../entities/role';
import { castTo } from '../entities/role-to-user';
import { User } from '../entities/user';
import { AVAILABLE_OPERATIONS } from '../settings/available-operations';

import type { RoleToUser } from "../entities/role-to-user";
import type { Email } from '../entities/email';
import type { Password } from '../entities/password';

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async findUser(email: Email, password: Password): Promise<User | undefined> {
    const users = await this.getAllUsers();
    const isTargetUser = (user: User): boolean => user.email === email && user.password === password;
    return users.find(isTargetUser);
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getAvailableOperations<
    R1 extends Role,
    U1 extends User & { role: R1 },
    R2 extends Role,
    U2 extends User & { role: R2 }
  >(user: U1, currentUser: U2) {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role] as AVAILABLE_OPERATIONS[U2["role"]][U1["role"]];
  }
}
