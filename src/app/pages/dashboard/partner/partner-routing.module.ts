import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerComponent } from './partner.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { ViewPartnerComponent } from './view-partner/view-partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
    children: [
      { path: '', component: ListPartnerComponent },
      { path: 'add-partner', component: AddPartnerComponent },
      { path: 'edit-partner/:id', component: AddPartnerComponent },
      { path: 'view-partner/:id', component: ViewPartnerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerRoutingModule {}
