import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { CouncilComponent } from './council/council.component';

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
    path: "plan",
    component: PlanComponent
  },
  {
    path: "consejo",
    component: CouncilComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
