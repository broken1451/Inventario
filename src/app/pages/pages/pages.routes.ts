import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { OtrosComponent } from './otros/otros.component';
import { PcComponent } from './pc/pc.component';
import { MemoriaComponent } from './memoria/memoria.component';
import { ProfileComponent } from './profile/profile.component';
import { PcDetailsComponent } from './pc/pc-details.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard', descrip: 'Esto es la pagina principal' },
  },
  {
    path: 'users',
    component: UserComponent,
    data: { titulo: 'users', descrip: 'Esto es la pagina users' },
  },
  {
    path: 'otros',
    component: OtrosComponent,
    data: { titulo: 'otros', descrip: 'Esto es la pagina otros' },
  },
  {
    path: 'pc',
    component: PcComponent,
    data: { titulo: 'pc', descrip: 'Esto es la pagina pc' },
  },
  {
    path: 'memorias',
    component: MemoriaComponent,
    data: { titulo: 'memorias', descrip: 'Esto es la pagina memorias' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { titulo: 'Profile', descrip: 'Esto es la pagina profile' },
  },
  {
    path: 'details/:id',
    component: PcDetailsComponent,
    data: { titulo: 'Details', descrip: 'Esto es la detalles del pc' },
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
