import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo: "authen", pathMatch: "full"},
  {
    path: 'authen',
    loadChildren: () => import('./authen/authen.module').then(m => m.AuthenModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
