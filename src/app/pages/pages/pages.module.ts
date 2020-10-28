import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { BreadcumbsComponent } from 'src/app/components/breadcumbs/breadcumbs.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routes';
import { UserComponent } from './user/user.component';
import { PcComponent } from './pc/pc.component';
import { MemoriaComponent } from './memoria/memoria.component';
import { OtrosComponent } from './otros/otros.component';



@NgModule({
  declarations: [ DashboardComponent, UserComponent, PcComponent, MemoriaComponent, OtrosComponent],
  exports: [DashboardComponent, UserComponent, PcComponent, MemoriaComponent, OtrosComponent],
  imports: [CommonModule, ComponentsModule, PagesRoutingModule],
})
export class PagesModule {}
