import { Component, OnInit } from '@angular/core';
import { AdminQueryService } from 'src/app/services/graphql/admin/admin-query.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { AdminMutationService } from 'src/app/services/graphql/admin/admin-mutation.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss'],
})
export class ListBookingComponent implements OnInit {
  pendingBookingList: any = [];
  ongoingBookingList: any;
  completedBookingList: any;
  draftBookingList: any;
  backupData: any[];
  tab: any;
  pendingBackup: any;
  ongoingBackup: any;
  completeBackup: any;
  draftBackup: any;
  cancelledBookingList: any[];

  constructor(
    private adminQuery: AdminQueryService,
    private adminMutation: AdminMutationService,
    private bookingService: BookingService,
    private router: Router
  ) {}
  getPendingBookings() {
    this.pendingBookingList = [];
    this.adminQuery.getBookings({ status: 'Pending' }).subscribe(res => {
      this.pendingBookingList = res.data.getBookings;
      this.backupData = this.pendingBookingList;
    });
  }
  async getOngoingBookings() {
    this.ongoingBookingList = [];
    await this.adminQuery.getBookings({ status: 'Active' }).subscribe(res => {
      this.ongoingBookingList = res.data.getBookings;
      this.backupData = this.ongoingBookingList;
    });
  }
  getCompletedBookings() {
    this.completedBookingList = [];
    this.adminQuery.getBookings({ status: 'Completed' }).subscribe(res => {
      this.completedBookingList = res.data.getBookings;
      this.backupData = this.completedBookingList;
    });
  }
  getDraftBookings() {
    this.draftBookingList = [];
    this.adminQuery.getBookings({ status: 'Draft' }).subscribe(res => {
      this.draftBookingList = res.data.getBookings;
      this.backupData = this.draftBookingList;
    });
  }
  getCancelledBookings() {
    this.draftBookingList = [];
    this.adminQuery.getBookings({ status: 'Cancelled' }).subscribe(res => {
      this.cancelledBookingList = res.data.getBookings;
      this.backupData = this.cancelledBookingList;
    });
  }
  openBookingForm(data) {
    this.bookingService.setType('draft');
    this.router.navigate(['./bookings/add-booking'], { queryParams: { id: data._id } });
  }
  resetDraftData() {
    this.bookingService.resetData();
  }

  cancelBooking(data) {
    console.log(data);
    this.adminMutation.updateBookingStatus(data._id, 'Cancelled', '').subscribe(res => {
       console.log(res);
       this.getOngoingBookings();
       this.getPendingBookings();
    });
  }
  tabChange(data) {
    this.tab = data;
    this.backupData = [];
    if (data === 'ongoing') {
      this.getOngoingBookings();
      this.backupData = this.ongoingBookingList;
      console.log(this.backupData);
    } else if (data === 'pending') {
      this.getPendingBookings();
      this.backupData = this.pendingBookingList;
    } else if (data === 'complete') {
      this.getCompletedBookings();
      this.backupData = this.completedBookingList;
    } else if (data === 'draft') {
      this.getDraftBookings();
      this.backupData = this.draftBookingList;
    } else if (data === 'cancelled') {
      this.getCancelledBookings();
      this.backupData = this.cancelledBookingList;
      console.log(this.backupData);
    }
  }
  filter(data) {
    const string = (<HTMLInputElement>document.getElementById('filterInput')).value;
    if (this.tab === 'ongoing') {
      this.ongoingBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.ongoingBookingList = this.backupData;
      } else {
        this.ongoingBookingList = this.ongoingBookingList.filter(item => {
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
    } else if (this.tab === 'draft') {
      this.draftBookingList = this.backupData;
      if (data.target.value.length === 0) {
        this.draftBookingList = this.backupData;
      } else {
        this.draftBookingList = this.draftBookingList.filter(item => {
          if (item.number !== null) {
            if (item.number.includes(string)) {
              return item;
            }
          }
        });
      }
    }
  }
  ngOnInit() {
    this.tabChange('ongoing');
  }
}
