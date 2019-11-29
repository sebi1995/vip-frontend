import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from 'ng-fullcalendar';
//  components
import { EventCalendarComponent } from '../../components/event-calendar/event-calendar.component';
import { NotificationComponent } from '../../components/notification/notification.component';
// import { BookingComponent } from './booking/booking.component';
// import { PartnerComponent } from './partner/partner.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    EventCalendarComponent,
    NotificationComponent,
    // BookingComponent,
    // PartnerComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FullCalendarModule],
})
export class DashboardModule {}
