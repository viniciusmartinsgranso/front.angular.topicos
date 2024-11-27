import { BaseProxy } from "./base.proxy";
import { UserRole } from "../enums/user-role.enum";

export interface UserProxy extends BaseProxy {
  name: string;
  email: string;
  role: UserRole[];
}
