import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      { path: '', component: ListInvoicesComponent },
      { path: 'view-invoice/:id', component: ViewInvoiceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
