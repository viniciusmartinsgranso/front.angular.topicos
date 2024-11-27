import { BaseProxy } from "./base.proxy";

export interface TableProxy extends BaseProxy {
  key: string;
  qrCodeUrl: string;
}