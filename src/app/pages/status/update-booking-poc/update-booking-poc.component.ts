import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMutationService } from 'src/app/services/graphql/admin/admin-mutation.service';
import { AdminQueryService } from 'src/app/services/graphql/admin/admin-query.service';

@Component({
  selector: 'app-update-booking-poc',
  templateUrl: './update-booking-poc.component.html',
  styleUrls: ['./update-booking-poc.component.scss'],
})
export class UpdateBookingPocComponent implements OnInit {
  id: any;
  token: any;
  poc: any;
  pocContact: any;
  bookingData: any;
  updated = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private adminMutation: AdminMutationService,
    private adminQuery: AdminQueryService
  ) {
    _activatedRoute.queryParams.subscribe(params => {
      console.log('queryParams', params['token'], params['bid']);
      this.id = params['bid'];
      this.token = params['token'];
    });
    this.getBooking();
  }

  updateBookingPoc() {
    console.log(this.poc, this.pocContact);
    if (
      this.poc !== undefined &&
      this.pocContact !== undefined &&
      this.poc !== '' &&
      this.pocContact !== ''
    ) {
      this.adminMutation
        .updateBookingPoc(this.id, this.poc, this.pocContact, this.token)
        .subscribe(
          res => {
            console.log(res);
            if (!this.token) {
              this._router.navigate(['bookings']);
            } else {
              this.updated = true;
            }
          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
    }
  }

  getBooking() {
    this.adminQuery.getBookings({ id: this.id, token: this.token }).subscribe(
      res => {
        console.log(res);
        console.log(res.data.getBookings['0']);
        this.bookingData = res.data.getBookings['0'];
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
  ngOnInit() {
  }
}
