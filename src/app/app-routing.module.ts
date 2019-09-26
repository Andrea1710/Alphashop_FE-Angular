// Modules
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ArticoliComponent } from "./articoli/articoli.component";
import { NewArtComponent } from './new-art/new-art.component';
import { LogoutComponent } from "./logout/logout.component";
import { ErrorComponent } from "./error/error.component";

// Guards
import { RouteGuardService } from "./services/route-guard.service";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "index", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "welcome/:userid", component: WelcomeComponent, canActivate: [RouteGuardService] },
  {  path: "articoli", component: ArticoliComponent, canActivate: [RouteGuardService]  },
  {  path: "articoli/:filter",  component: ArticoliComponent, canActivate: [RouteGuardService] },
  {  path: "newart/:codart",  component: NewArtComponent, canActivate: [RouteGuardService] },
  { path: "logout", component: LogoutComponent },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
