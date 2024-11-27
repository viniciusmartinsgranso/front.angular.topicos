import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  public static readonly DISABLE_HEADER: string = 'X-Disabled-BaseUrl';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `${ environment.api.apiBaseUrl }${ req.url }`
    });

    return next.handle(req);
  }

}
