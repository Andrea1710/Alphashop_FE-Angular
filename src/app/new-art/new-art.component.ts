import { ArticoliDataService } from './../services/data/articoli-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Articolo } from '../articoli/articoli.component';

@Component({
  selector: "app-new-art",
  templateUrl: "./new-art.component.html",
  styleUrls: ["./new-art.component.css"],
})
export class NewArtComponent implements OnInit {

  codArt: string = "";
  articolo: Articolo;

  constructor(private route: ActivatedRoute, private articoliService: ArticoliDataService) {}

  ngOnInit() {
    this.codArt = this.route.snapshot.paramMap['codart'];
    this.articoliService.getArticoliByCodArt(this.codArt).subscribe(
      response => {
        this.articolo = response;
      },
      error => {
        console.log(error);
      }
    )
  }
}
