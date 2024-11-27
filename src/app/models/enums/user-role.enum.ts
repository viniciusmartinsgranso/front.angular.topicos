export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserRoleHelper {
  static getTitle(role: UserRole): string {
    const title: Record<UserRole, string> = {
      admin: 'Administrador',
      user: 'Usuário',
    };

    return title[role];
  }
}
