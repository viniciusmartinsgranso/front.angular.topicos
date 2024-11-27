import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { CategoryProxy } from "../../models/proxies/categoryProxy";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../shared/utils/functions";
import { createCrudUrl } from "../../shared/utils/crud";
import { PizzaProxy } from "../../models/proxies/pizza.proxy";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async create(payload: { name: string }): Promise<[boolean, string]> {
    const { success, error } = await this.http.post<CategoryProxy>(environment.api.routes.category.create, payload);

    if (error || !success)
      return [false, getCrudErrors(error)[0]];

    return [true, 'Categoria criada com sucesso!'];

  }

  public async getMany(): Promise<CategoryProxy[]> {
    const { success, error } = await this.http.get<CategoryProxy[]>(environment.api.routes.category.getMany);

    if (error || !success)
      return [];

    return success;
  }

  public async getManyByIds(ids: number[]): Promise<CategoryProxy[]> {
    const url = environment.api.routes.category.getManyByIds.replace('{ids}', String(ids));

    const { success, error } = await this.http.get<CategoryProxy[]>(url);

    if (error || !success)
      return [];

    return success;
  }

  public async getOne(id: number): Promise<[CategoryProxy | undefined, string?]> {
    const url = environment.api.routes.category.one.replace('{id}', String(id))
    const { success, error } = await this.http.get<CategoryProxy>(url)

    if (error || !success)
      return [undefined, getCrudErrors(error)[0]];

    return [success];
  }

  public async updateOne(payload: Pick<CategoryProxy, 'name'>, id: string): Promise<[boolean, string]> {
    const url = environment.api.routes.category.update.replace('{id}', id);
    const { success, error } = await this.http.patch<boolean>(url, payload);

    if (!success || error)
      return [false, getCrudErrors(error)[0]];

    return [true, 'Ingrediente atualizado com sucesso!'];
  }

  public async activate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.category.activate.replace('{id}', String(id))
    const { success, error } = await this.http.patch<CategoryProxy>(url, {})

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async deactivate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.category.deactivate.replace('{id}', String(id))
    const { success, error } = await this.http.patch<CategoryProxy>(url, {})

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

}
