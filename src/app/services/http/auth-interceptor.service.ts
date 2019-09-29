import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthappService } from '../authapp.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(private basicAuth: AuthappService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.basicAuth.getAuthToken();
      const user = this.basicAuth.loggedUser();
      
      if (authToken && user) req = req.clone({ setHeaders: { Authorization: authToken } });

      return next.handle(req);
    }
}
