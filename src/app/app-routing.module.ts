import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { CouncilComponent } from './council/council.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
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
