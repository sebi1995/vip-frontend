import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS,
} from 'ng-pick-datetime';
@NgModule({
  declarations: [
    AccountingComponent,
    ListInvoicesComponent,
    ViewInvoiceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountingRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class AccountingModule {}
