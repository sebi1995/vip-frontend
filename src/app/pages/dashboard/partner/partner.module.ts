import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { ViewPartnerComponent } from './view-partner/view-partner.component';
@NgModule({
  declarations: [
    PartnerComponent,
    ListPartnerComponent,
    AddPartnerComponent,
    ViewPartnerComponent,
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PartnerModule {}
