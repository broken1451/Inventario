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
import { PipeModule } from '../../pipes/pipe.module';
import { MomentModule } from 'angular2-moment';
import { PcDetailsComponent } from './pc/pc-details.component';
import { MemoryComponent } from './memoria/memory.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    PcComponent,
    MemoriaComponent,
    OtrosComponent,
    ProfileComponent,
    PcDetailsComponent,
    MemoryComponent,
  ],
  exports: [
    DashboardComponent,
    UserComponent,
    PcComponent,
    MemoriaComponent,
    OtrosComponent,
    ProfileComponent,
    PcDetailsComponent,
    MemoryComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    MomentModule,
  ],
})
export class PagesModule {}
