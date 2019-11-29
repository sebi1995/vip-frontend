import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AccountingComponent } from './accounting/accounting.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',

        component: HomeComponent,
      },
      {
        path: 'partners',
        loadChildren: './partner/partner.module#PartnerModule',
      },
      {
        path: 'bookings',
        loadChildren: './booking/booking.module#BookingModule',
      },
      {
        path: 'invoice',
        loadChildren: './accounting/accounting.module#AccountingModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
