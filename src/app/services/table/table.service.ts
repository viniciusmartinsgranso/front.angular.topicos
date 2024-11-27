import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../shared/utils/functions";
import { TableProxy } from "../../models/proxies/table.proxy";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async getMany(): Promise<TableProxy[]> {
    const url = environment.api.routes.tables.getMany;

    const { error, success } = await this.http.get<TableProxy[]>(url);

    if (error || !success)
      return [];

    return success;
  }

  public async create(payload: any): Promise<[boolean, string?]> {
    const url = environment.api.routes.tables.create;

    const { success, error } = await this.http.post<TableProxy>(url, payload);

    if (!error && !success)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async deactivate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.tables.deactivate.replace('{id}', String(id));

    const { success, error } = await this.http.patch<TableProxy>(url, {});

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async activate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.tables.activate.replace('{id}', String(id));

    const { success, error } = await this.http.patch<TableProxy>(url, {});

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

}
