import { ArticoliDataService } from './../services/data/articoli-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Articolo, ApiMsg, FamAss, Iva } from '../articoli/articoli.component';

@Component({
  selector: "app-new-art",
  templateUrl: "./new-art.component.html",
  styleUrls: ["./new-art.component.css"],
})
export class NewArtComponent implements OnInit {

  codArt: string = "";
  articolo: Articolo;

  conferma: string = "";
  errore: string = "";
  isModifica: boolean = false;

  apiMsg: ApiMsg;

  tipiIva = [
    { id: 22, descrizione: "Iva 22%", aliquota: 22 },
    { id: 10, descrizione: "Iva 10%", aliquota: 10 },
    { id: 4, descrizione: "Iva 4%", aliquota: 4 },
    { id: 0, descrizione: "Iva esente", aliquota: 0 }
  ];

  tipiFamAssort = [
    { id: -1, descrizione: "NON DISPONIBILE" },
    { id: 1, descrizione: "DROGHERIA ALIMENTARE" },
    { id: 10, descrizione: "DROGHERIA CHIMICA" },
    { id: 15, descrizione: "BANCO TAGLIO" },
    { id: 16, descrizione: "GASTRONOMIA" },
    { id: 17, descrizione: "PASTICCERIA" },
    { id: 20, descrizione: "LIBERO SERVIZIO" },
    { id: 25, descrizione: "PANE" },
    { id: 40, descrizione: "SURGELATI" },
    { id: 50, descrizione: "ORTOFRUTTA" },
    { id: 60, descrizione: "MACELLERIA" },
    { id: 70, descrizione: "PESCHERIA" },
    { id: 90, descrizione: "EXTRA ALIMENTARI" }
  ];

  constructor(private route: ActivatedRoute, private articoliService: ArticoliDataService, private router: Router) {}

  ngOnInit() {
    this.codArt = this.route.snapshot.params['codart'];

    this.articolo = new Articolo("-1", "", "", 0, 0, 0, "1 ", new Date(), new FamAss(0, ""), new Iva(22, "", 22));

    if (this.codArt != "-1") {
      this.isModifica = true;
      this.articoliService.getArticoliByCodArt(this.codArt)
        .subscribe(
          response => this.articolo = response,
          error => console.log(error)
      );
    } else {
      this.isModifica = false;
    }
  };

  salva() {
    this.conferma = "";
    this.errore = "";

    if (this.codArt === "-1") {
      this.articoliService.insertArticolo(this.articolo)
        .subscribe(
          response => {
            this.apiMsg = response;
            this.conferma = this.apiMsg.message;      
          },
          error => this.errore = error.error.messaggio
        );
    } else {
      this.articoliService.updateArticoli(this.articolo)
        .subscribe(
          response => {
            this.apiMsg = response;
            this.conferma = this.apiMsg.message;     
            this.router.navigate(['newart', this.articolo.codArt]) 
          },
          error => this.errore = error.error.messaggio
        );
      }
  };

  esci() {
    this.router.navigate(['articoli', this.codArt]);
  }
}
