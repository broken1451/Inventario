import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagesRoutingModule } from '../pages/pages/pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  declarations: [BreadcumbsComponent, HeaderComponent, SidebarComponent],
  exports: [BreadcumbsComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule, PipeModule],
})
export class ComponentsModule {}
