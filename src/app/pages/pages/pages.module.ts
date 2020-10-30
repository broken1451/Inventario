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
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ DashboardComponent, UserComponent, PcComponent, MemoriaComponent, OtrosComponent, ProfileComponent],
  exports: [DashboardComponent, UserComponent, PcComponent, MemoriaComponent, OtrosComponent, ProfileComponent],
  imports: [CommonModule, ComponentsModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
