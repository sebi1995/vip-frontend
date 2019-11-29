import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { BookingStatusComponent } from './pages/status/booking-status/booking-status.component';
import { UpdateBookingPocComponent } from './pages/status/update-booking-poc/update-booking-poc.component';
const routes: Routes = [
  { path: 'login', loadChildren: './pages/auth/auth.module#AuthModule' },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'accept',
    component: BookingStatusComponent,
  },
  {
    path: 'reject',
    component: BookingStatusComponent,
  },
  {
    path: 'updatePoc',
    component: UpdateBookingPocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
