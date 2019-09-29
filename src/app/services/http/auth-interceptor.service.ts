import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const userId = "Admin";
      const password = "VerySecretPwd";
      const authHeader = `Basic ${window.btoa(userId + ':' + password)}`;
      req = req.clone({ setHeaders: { Authorization: authHeader } });
      return next.handle(req);
    }
    
  constructor() {}
}
