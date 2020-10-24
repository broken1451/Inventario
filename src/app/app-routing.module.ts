import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { PagesComponent } from './pages/pages/pages.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';

const routes: Routes = [
  // =================================== Con LazyLoad ==============================================
  // ===============================================================================================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: '',
  //   component: PagesComponent,
  //   loadChildren: () =>
  //     import('./pages/pages/pages.module').then((m) => m.PagesModule),
  // },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
