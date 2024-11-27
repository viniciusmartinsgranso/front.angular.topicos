import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../shared/utils/functions";
import { OrderProxy } from "../../models/proxies/orders/order.proxy";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  public async createOrder(payload: OrderProxy): Promise<[boolean, string]> {
    const { error } = await this.http.post(environment.api.routes.orders.create, payload);

    if (error)
      return [false, getCrudErrors(error)[0]];

    return [true, 'Pedido enviado com sucesso!'];
  }

  public async getMany(): Promise<[boolean, OrderProxy[]]> {
    const { success, error } = await this.http.get<OrderProxy[]>(environment.api.routes.orders.getMany);

    if (error || !success)
      return [false, []];

    return [true, success];
  }

  public async finish(id: number): Promise<boolean> {
    const { success, error } = await this.http.patch(environment.api.routes.orders.finish, { id });

    return !(error || !success);
  }

}
