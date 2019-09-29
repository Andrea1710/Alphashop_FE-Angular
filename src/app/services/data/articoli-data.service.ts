import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Articolo } from "src/app/articoli/articoli.component";
import { ApiMsg } from './../../articoli/articoli.component';
import { server, port } from 'src/app/app.constants';

@Injectable({ providedIn: "root" })
export class ArticoliDataService {

  constructor(private httpClient: HttpClient) {}

  getArticoliByDescription(descrizione: string) {
    return this.httpClient.get<Articolo[]>(`http://${server}:${port}/api/articoli/cerca/descrizione/${descrizione}`);
  }

  getArticoliByCodArt(codart: string) {
    return this.httpClient.get<Articolo>(`http://${server}:${port}/api/articoli/cerca/codice/${codart}`);
  }

  getArticoliByEan(barcode: string) {
    return this.httpClient.get<Articolo>(`http://${server}:${port}/api/articoli/cerca/ean/${barcode}`);
  }

  deleteArticoloByCodArt(codart: string) {
    return this.httpClient.delete<ApiMsg>(`http://${server}:${port}/api/articoli/elimina/${codart}`);
  };

  updateArticoli(articolo: Articolo) {
    return this.httpClient.put<ApiMsg>(`http://${server}:${port}/api/articoli/modifica`, articolo);
  }

  insertArticolo(articolo: Articolo) {
    return this.httpClient.post<ApiMsg>(`http://${server}:${port}/api/articoli/inserisci`, articolo);
  }
}
