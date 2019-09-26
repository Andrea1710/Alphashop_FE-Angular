import { ApiMsg } from './../../articoli/articoli.component';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Articolo } from "src/app/articoli/articoli.component";

@Injectable({ providedIn: "root" })
export class ArticoliDataService {

  server = "localhost";
  port = "8080";

  constructor(private httpClient: HttpClient) {}

  getArticoliByDescription(descrizione: string) {
    return this.httpClient.get<Articolo[]>(
      `http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`
    );
  }

  getArticoliByCodArt(codart: string) {
    return this.httpClient.get<Articolo>(
      `http://${this.server}:${this.port}/api/articoli/cerca/codice/${codart}`
    );
  }

  getArticoliByEan(barcode: string) {
    return this.httpClient.get<Articolo>(
      `http://${this.server}:${this.port}/api/articoli/cerca/ean/${barcode}`
    );
  }

  deleteArticoloByCodArt(codart: string) {
    return this.httpClient.delete<ApiMsg>(
      `http://${this.server}:${this.port}/api/articoli/elimina/${codart}`
    );
  }
}
