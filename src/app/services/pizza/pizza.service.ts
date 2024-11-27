import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { CreatePizzaPayload } from "../../models/payloads/create-pizza.payload";
import { environment } from "../../../environments/environment";
import { PizzaProxy } from "../../models/proxies/pizza.proxy";
import { getCrudErrors } from "../../shared/utils/functions";
import { createCrudUrl } from "../../shared/utils/crud";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor() { }

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async create(payload: CreatePizzaPayload): Promise<[PizzaProxy?, string?]> {
    const { error, success } = await this.http.post<PizzaProxy>(environment.api.routes.pizzas.create, payload);

    if (error || !success)
      return [undefined, getCrudErrors(error)[0]];

    return [success];
  }

  public async getOne(id: number): Promise<[PizzaProxy | undefined, string?]> {
    const url = environment.api.routes.pizzas.getOne.replace('{id}', String(id));

    const { error, success } = await this.http.get<PizzaProxy>(url);

    if (!success || error)
      return [undefined, getCrudErrors(error)[0]];

    return [success];
  }

  public async getMany(): Promise<PizzaProxy[]> {
    const { success, error } = await this.http.get<PizzaProxy[]>(environment.api.routes.pizzas.getMany);

    if (error || !success)
      return []

    return success;
  }

  public async getManyWithJoins(): Promise<PizzaProxy[]> {
    const url = createCrudUrl<PizzaProxy>(environment.api.routes.pizzas.getMany, {
      join: [
        'ingredients'
      ]
    });

    const { success, error } = await this.http.get<PizzaProxy[]>(url);

    if (error || !success)
      return [];

    return success;
  }

  public async updateOne(id: number, payload: PizzaProxy): Promise<[boolean, string?]> {
    const url = environment.api.routes.pizzas.updateOne.replace('{id}', String(id));

    const { success, error } = await this.http.patch<boolean>(url, payload)

    if (!success || error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async activate(id: number): Promise<boolean> {
    const url = environment.api.routes.pizzas.activate.replace('{id}', String(id))
    const { success, error } = await this.http.put<boolean>(url, {});

    return !(error || !success);
  }

  public async deactivate(id: number): Promise<boolean> {
    const url = environment.api.routes.pizzas.deactivate.replace('{id}', String(id))

    const { success, error } = await this.http.put<boolean>(url, {});

    return !(error || !success);
  }

}
