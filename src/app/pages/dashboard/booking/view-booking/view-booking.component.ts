import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminQueryService } from '../../../../services/graphql/admin/admin-query.service';
import { BookingService } from '../booking.service';
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss'],
})
export class ViewBookingComponent implements OnInit {
  constructor(
    private adminQuery: AdminQueryService,
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}
  id: any;
  bookingData: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id !== undefined) {
        this.getData();
      }
    });
  }
  openBookingForm(data) {
    this.bookingService.setType('edit');
    this.router.navigate(['./bookings/add-booking'], {
      queryParams: { id: data._id },
    });
  }

  getData() {
    this.adminQuery.getBookings({ id: this.id }).subscribe(
      ({ data }) => {
        console.log('====>');
        console.log(data.getBookings[0]);
        this.bookingData = data.getBookings[0];
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
