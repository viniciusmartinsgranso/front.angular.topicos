import { inject, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { UserProxy } from "../../models/proxies/user.proxy";
import { StorageService } from "../storage/storage.service";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { getCrudErrors } from "../../shared/utils/functions";
import { JwtTokenProxy } from "../../models/proxies/jwt-token.proxy";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly storage: StorageService = inject(StorageService);

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  private readonly currentUser$: BehaviorSubject<UserProxy | null> =
    new BehaviorSubject<UserProxy | null>(null);

  public getCurrentUser$(): Observable<UserProxy | null> {
    return this.currentUser$.asObservable();
  }

  public setCurrentUser(user: UserProxy | null): void {
    return this.currentUser$.next(user);
  }

  public async getCurrentUserFromStorage(): Promise<UserProxy | null> {
    const result = await this.storage.getItem<UserProxy>(environment.keys.user);

    if (!result) return null;

    this.currentUser$.next(result);

    return result;
  }

  public getCurrentUser(): UserProxy | null {
    return this.currentUser$.getValue();
  }

  public async getMe(): Promise<UserProxy> {
    const { error, success } = await this.http.get<UserProxy>(
      environment.api.routes.users.me,
    );

    if (error || !success) throw new Error(getCrudErrors(error)[0]);

    return success!;
  }

  public async isLogged(): Promise<boolean> {
    const result = await this.storage.getItem<UserProxy>(
      environment.keys.token,
    );

    return !!result;
  }

  public async getUserToken(): Promise<JwtTokenProxy | null> {
    const token = await this.storage.getItem<JwtTokenProxy>(
      environment.keys.token,
    );

    if (!token) return null;

    return token;
  }

  public async getMany(): Promise<UserProxy[]> {
    const { error, success } = await this.http.get<UserProxy[]>(environment.api.routes.users.getMany);

    if (error || !success)
      return [];

    return success;
  }


}
