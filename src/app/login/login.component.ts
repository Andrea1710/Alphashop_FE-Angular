import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthappService } from "../services/authapp.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userid = "";
  password = "";
  autenticato = true;
  errorMsg = "Spiacente, lo Username o la Password sono errati!";

  constructor(private route: Router, private basicAuth: AuthappService) {}

  ngOnInit() {}

  gestAut() {
    this.basicAuth.autenticaService(this.userid, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.autenticato = true;
          this.route.navigate(['welcome', this.userid]);
        },
        error => {
          console.log(error);
          this.autenticato = false;
        }
      )
  }
}
