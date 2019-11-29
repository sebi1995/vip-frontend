import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { ViewBookingComponent } from './view-booking/view-booking.component';

@NgModule({
  declarations: [BookingComponent, ListBookingComponent, AddBookingComponent, ViewBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class BookingModule {}
