import { Component, OnInit } from '@angular/core';
import { AdminQueryService } from 'src/app/services/graphql/admin/admin-query.service';
@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss'],
})
export class ListInvoicesComponent implements OnInit {
  search: String;
  bookingList: any;
  completedBookingList: any;
  pendingBookingList: any;
  activeBookingList: any;
  cancelledBookingList: any;
  backupData: any;
  tab = 'complete';
  constructor(private adminQuery: AdminQueryService) {}

  ngOnInit() {
    this.getCompletedBookings();
  }

  getCompletedBookings = async () => {
    this.bookingList = [];
    this.adminQuery.getBookings({}).subscribe(res => {
      console.log(res);
      this.bookingList = res.data.getBookings;
      this.backupData = this.bookingList;
      this.getCompleted();
      this.getPendingBookings();
      this.getActiveBookings();
      this.getCancelledBookings();
    });
  };

  tabChange(data) {
    this.tab = data;
    this.backupData = [];
    if (data === 'ongoing') {
      this.getActiveBookings();
      this.backupData = this.activeBookingList;
    } else if (data === 'pending') {
      this.getPendingBookings();
      this.backupData = this.pendingBookingList;
    } else if (data === 'complete') {
      this.getCompleted();
      this.backupData = this.completedBookingList;
    } else if (data === 'cancelled') {
      this.getCancelledBookings();
      this.backupData = this.cancelledBookingList;
    }
  }

  getCompleted() {
    this.completedBookingList = this.bookingList.filter(d => {
      return d.status === 'Completed';
    });

    console.log(this.completedBookingList);
  }

  getPendingBookings = async () => {
    this.pendingBookingList = this.bookingList.filter(d => {
      return d.status === 'Pending';
    });

    console.log(this.pendingBookingList);
  };

  getActiveBookings = async () => {
    this.activeBookingList = this.bookingList.filter(d => {
      return d.status === 'Active';
    });

    console.log(this.activeBookingList);
  };

  getCancelledBookings = async () => {
    this.cancelledBookingList = this.bookingList.filter(d => {
      return d.status === 'Cancelled';
    });

    console.log(this.cancelledBookingList);
  };

  filter(data) {
    const string = data.target.value;
    // console.log(data);
    // if (data.target.value.length === 0) {
    //   this.completedBookingList = this.backupData;
    // } else {
    //   this.completedBookingList = this.completedBookingList.filter(item => {
    //     if (item.number !== null) {
    //       if (item.number.includes(this.search)) {
    //         return item;
    //       }
    //     }
    //   });
    // }

    if (this.tab === 'ongoing') {
      this.activeBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.activeBookingList = this.backupData;
      } else {
        this.activeBookingList = this.activeBookingList.filter(item => {
          if (item.number !== null) {
            if (item.number.includes(string)) {
              return item;
            }
          }
        });
      }
    } else if (this.tab === 'pending') {
      this.pendingBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.pendingBookingList = this.backupData;
      } else {
        this.pendingBookingList = this.pendingBookingList.filter(item => {
          if (item.number !== null) {
            if (item.number.includes(string)) {
              return item;
            }
          }
        });
      }
    } else if (this.tab === 'complete') {
      this.completedBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.completedBookingList = this.backupData;
      } else {
        this.completedBookingList = this.completedBookingList.filter(item => {
          if (item.number !== null) {
            if (item.number.includes(string)) {
              return item;
            }
          }
        });
      }
    } else if (this.tab === 'cancelled') {
      this.cancelledBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.cancelledBookingList = this.backupData;
      } else {
        this.cancelledBookingList = this.cancelledBookingList.filter(item => {
          if (item.number !== null) {
            if (item.number.includes(string)) {
              return item;
            }
          }
        });
      }
    }
  }
}
