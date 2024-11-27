import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { DrinkProxy } from "../../models/proxies/drink.proxy";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../shared/utils/functions";
import { CreateDrinkPayload } from "../../models/payloads/create-drink.payload";

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor() { }

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async create(payload: CreateDrinkPayload): Promise<[boolean, string?]> {
    const url = environment.api.routes.drinks.create;

    const { error } = await this.http.post<boolean>(url, payload);

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async getMany(): Promise<DrinkProxy[]> {
    const url = environment.api.routes.drinks.getMany;

    const { success, error } = await this.http.get<DrinkProxy[]>(url);

    if (error || !success)
      return [];

    return success;
  }

  public async getOne(id: number): Promise<[DrinkProxy?, string?]> {
    const url = environment.api.routes.drinks.getOne.replace('{id}', String(id));

    const { success, error } = await this.http.get<DrinkProxy>(url);

    if (error || !success)
      return [undefined, getCrudErrors(error)[0]];

    return [success];
  }

  public async update(id: number, payload: Partial<DrinkProxy>): Promise<[boolean, string?]> {
    const url = environment.api.routes.drinks.update.replace('{id}', String(id));

    const { error } = await this.http.patch<boolean>(url, payload);

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async activate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.drinks.activate.replace('{id}', String(id));

    const { error } = await this.http.patch<boolean>(url, {});

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }

  public async deactivate(id: number): Promise<[boolean, string?]> {
    const url = environment.api.routes.drinks.deactivate.replace('{id}', String(id));

    const { error } = await this.http.patch<boolean>(url, {});

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true];
  }
}
