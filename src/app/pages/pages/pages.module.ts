import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { BreadcumbsComponent } from 'src/app/components/breadcumbs/breadcumbs.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routes';



@NgModule({
  declarations: [ DashboardComponent],
  exports: [DashboardComponent],
  imports: [CommonModule, ComponentsModule, PagesRoutingModule],
})
export class PagesModule {}
