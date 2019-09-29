// tslint:disable-next-line: quotemark
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { server, port } from '../app.constants';

export class AuthData {
  constructor(public codice: string, public messaggio: string) {}
}

@Injectable({ providedIn: "root" })
export class AuthappService {

  constructor(private http: HttpClient) {}

  autentica(userId, password) {
    if (userId === "Andrea" && password === "test") {
      sessionStorage.setItem("Utente", userId);
      return true;
    } else return false;
  }

  autenticaService(userId: string, password: string) {
    const authString = `Basic ${window.btoa(userId + ":" + password)}`;
    const headers = new HttpHeaders({ Authorization: authString });
    return this.http.get<AuthData>(
      `http://${server}:${port}/api/articoli/test`, 
      { headers })
        .pipe(map(data => {
          sessionStorage.setItem("Utente", userId);
          sessionStorage.setItem("AuthToken", authString);
          return data
        }));
  }

  loggedUser() {
    const utente = sessionStorage.getItem("Utente");
    return sessionStorage.getItem("Utente") != null ? utente : "";
  }

  getAuthToken() {
    if (this.loggedUser) return sessionStorage.getItem("AuthToken");
    else return "";
  }

  isLogged() {
    return sessionStorage.getItem("Utente") != null ? true : false;
  }

  clearAll() {
    sessionStorage.removeItem("Utente");
  }
}
