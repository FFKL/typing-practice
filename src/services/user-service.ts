import { Admin } from '../entities/admin';
import { Client } from '../entities/client';
import { Moderator } from '../entities/moderator';
import { Operation } from '../entities/operation';
import { Role } from '../entities/role';

import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";

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

  getAvailableOperations(user: User, currentUser: User): Operation[] {
    // TODO: Вам нужно поменять логику внутри getAvailableOperations для того, что бы это работало с логином

    if (currentUser instanceof Moderator) {
      if (user instanceof Moderator) {
        return [Operation.UPDATE_TO_CLIENT];
      } else if (user instanceof Admin) {
        return [];
      }

      return [Operation.UPDATE_TO_MODERATOR];
    }

    if (user instanceof Admin || user instanceof Client) {
      return [Operation.UPDATE_TO_MODERATOR];
    }

    return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
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
