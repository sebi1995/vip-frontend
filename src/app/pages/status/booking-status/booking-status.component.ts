import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminMutationService } from '../../../services/graphql/admin/admin-mutation.service';
@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss'],
})
export class BookingStatusComponent implements OnInit {
  token: any;
  bookingId: any;
  status: any;
  text: any;
  url: any;
  success: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminMutation: AdminMutationService
  ) {}

  ngOnInit() {
    this.url = this.route.snapshot.url[0].path;
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['token'];
      this.bookingId = params['bid'];
      if (this.url === 'accept') {
        this.status = 'Active';
        this.text = 'accepted';
      } else if (this.url === 'reject') {
        this.status = 'Declined';
        this.text = 'rejected';
      }
      if (this.token && this.bookingId) {
        this.setStatus();
      }
    });
  }

  setStatus() {
    this.adminMutation
      .updateBookingStatus(this.bookingId, this.status, this.token)
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.success = true;
        },
        err => {
          this.success = false;
        }
      );
  }
}
