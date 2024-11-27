import { inject, Injectable } from '@angular/core';
import { HttpAsyncService } from "../../modules/http-async/services/http-async.service";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../shared/utils/functions";
import { HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  private readonly http: HttpAsyncService = inject(HttpAsyncService);

  private readonly userService: UserService = inject(UserService);

  public async uploadImage(file: File): Promise<[boolean, string]> {
    const url = environment.api.routes.media.create;

    const formData = new FormData();

    formData.append('file', file);

    const token = await this.userService.getUserToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token?.token }`,
    });

    const http = this.http.getNativeClient();

    try {
      const response = await firstValueFrom(http.post(url, formData, { headers })) as { url: string };
      return [true, response.url]
    } catch (error) {
      return [false, getCrudErrors(error)[0]];
    }
  }
}
