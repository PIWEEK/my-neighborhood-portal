import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntityComponent } from './entity/entity.component';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { CouncilComponent } from './council/council.component';
import { PlanComponent } from './plan/plan.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/inicio/muro",
  },
  {
    path: "inicio",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/inicio/muro",
      },
      {
        path: "muro",
        component: HomeComponent,
        data: {activeTab: "wall"},
      },
      {
        path: "lista",
        component: HomeComponent,
        data: {activeTab: "list"},
      },
      {
        path: "calendario",
        component: HomeComponent,
        data: {activeTab: "calendar"},
      },
      {
        path: "mapa",
        component: HomeComponent,
        data: {activeTab: "map"},
      },
    ],
  },
  {
    path: "ficha/:id",
    component: EntityComponent
  },
  {
    path: "pagina",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/pagina/barrio",
      },
      {
        path: "barrio",
        component: NeighborhoodComponent
      },
      {
        path: "consejo",
        component: CouncilComponent
      },
      {
        path: "plan",
        component: PlanComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
