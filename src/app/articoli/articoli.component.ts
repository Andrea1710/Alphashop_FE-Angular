import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ArticoliDataService } from "../services/data/articoli-data.service";

export class Articolo {
  constructor(
    public codart: string,
    public descrizione: string,
    public um: string,
    public pzcart: number,
    public peso: number,
    public prezzo: number,
    public isactive: boolean,
    public data: Date
  ) {}
}

export class ApiMsg {
  constructor(public code: string, public message: string) {}
}

@Component({
  selector: "app-articoli",
  templateUrl: "./articoli.component.html",
  styleUrls: ["./articoli.component.css"],
})
export class ArticoliComponent implements OnInit {
  numArt = 0;

  articolo: Articolo;
  articoli: Articolo[];

  filter: string = "";

  pagina: number = 1;
  righe: number = 10;

  apiMsg: ApiMsg;
  messaggio: string;

  constructor(
    private articoliService: ArticoliDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.filter = this.route.snapshot.params["filter"];
    if (this.filter) this.getArticoli(this.filter);
  }

  getArticoli(filter: string) {
    this.articoliService.getArticoliByCodArt(filter).subscribe(
      response => {
        this.articoli = [];
        this.articolo = response;
        this.articoli.push(this.articolo);
        this.numArt = this.articoli.length;
      },
      error => {
        console.log(error.error.messaggio);
        this.articoliService
          .getArticoliByDescription(filter)
          .subscribe(response => {
            this.articoli = response;
            this.numArt = this.articoli.length;
          });
      }
    );
  }

  modifica(codart: string) {
    this.router.navigate(['newart', codart]);
  }

  elimina(codArt: string) {
    this.articoliService.deleteArticoloByCodArt(codArt).subscribe(response => {
      this.getFilteredResults();
      this.apiMsg = response;
      this.messaggio = this.apiMsg.message;
    });
  }

  getFilteredResults() {
    this.getArticoli(this.filter);
    }

  getPageChange(pageChange) {
    this.pagina = pageChange;
  }
}
