import { Admin } from '../entities/admin';
import { Client } from '../entities/client';
import { Moderator } from '../entities/moderator';
import { Operation } from '../entities/operation';
import { PrivilegedUser } from '../entities/privileged-user';
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

  getAvailableOperations(user: User, currentUser: PrivilegedUser): Operation[] {
    switch (currentUser.role) {
      case Role.ADMIN:
        return this.getAvailableOperationsForAdmin(user);
      case Role.MODERATOR:
        return this.getAvailableOperationsForModerator(user);
    }
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

  private getAvailableOperationsForModerator(user: User): Operation[] {
    switch (user.role) {
      case Role.ADMIN:
        return [];
      case Role.MODERATOR:
        return [Operation.UPDATE_TO_CLIENT];
      case Role.CLIENT:
        return [Operation.UPDATE_TO_MODERATOR];
    }
  }

  private getAvailableOperationsForAdmin<U extends User>(user: U): Operation[] {
    switch (user.role) {
      case Role.ADMIN:
        return [Operation.UPDATE_TO_MODERATOR];
      case Role.MODERATOR:
        return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
      case Role.CLIENT:
        return [Operation.UPDATE_TO_MODERATOR];
    }
  }
}
