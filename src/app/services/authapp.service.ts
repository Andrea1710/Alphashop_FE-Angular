// tslint:disable-next-line: quotemark
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthappService {
  constructor() {}

  autentica(userId, password) {
    if (userId === "Andrea" && password === "test") {
      sessionStorage.setItem("Utente", userId);
      return true;
    } else return false;
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
