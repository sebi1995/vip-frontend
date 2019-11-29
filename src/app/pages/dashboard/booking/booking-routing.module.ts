import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        component: ListBookingComponent,
      },
      {
        path: 'add-booking',
        component: AddBookingComponent,
      },
      {
        path: 'add-booking/:id',
        component: AddBookingComponent,
      },
      { path: 'list-booking', component: ListBookingComponent },
      { path: 'view-booking/:id', component: ViewBookingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
