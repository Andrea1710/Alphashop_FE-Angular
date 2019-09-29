// tslint:disable-next-line: quotemark
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class AuthData {
  constructor(public codice: string, public messaggio: string) {}
}

@Injectable({ providedIn: "root" })
export class AuthappService {

  server = "localhost";
  port = "8080";

  constructor(private http: HttpClient) {}

  autentica(userId, password) {
    if (userId === "Andrea" && password === "test") {
      sessionStorage.setItem("Utente", userId);
      return true;
    } else return false;
  }

  autenticaService(userId: string, password: string) {
    const headers = new HttpHeaders({ Authorization: `Basic ${window.btoa(userId + ":" + password)}` });
    return this.http.get<AuthData>(
      `http://${this.server}:${this.port}/api/articoli/test`, 
      { headers })
        .pipe(map(data => {
          sessionStorage.setItem("Utente", userId);
          return data
        }));
  }

  loggedUser() {
    const utente = sessionStorage.getItem("Utente");
    return sessionStorage.getItem("Utente") != null ? utente : "";
  }

  isLogged() {
    return sessionStorage.getItem("Utente") != null ? true : false;
  }

  clearAll() {
    sessionStorage.removeItem("Utente");
  }
}
