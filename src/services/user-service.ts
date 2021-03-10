import { Admin } from '../entities/admin';
import { Client } from '../entities/client';
import { Moderator } from '../entities/moderator';
import { Role } from '../entities/role';
import { AVAILABLE_OPERATIONS } from '../settings/available-operations';

import type { User } from "../entities/user";
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
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  async findUser(email: Email, password: Password): Promise<User | undefined> {
    const users = await this.getAllUsers();
    const isTargetUser = (user: User): boolean => user.email === email.value && user.password === password.value;
    return  users.find(isTargetUser);
  }

  getAvailableOperations<
    R1 extends Role,
    U1 extends User & { role: R1 },
    R2 extends Role,
    U2 extends User & { role: R2 }
  >(user: U1, currentUser: U2) {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role] as AVAILABLE_OPERATIONS[U2["role"]][U1["role"]];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
