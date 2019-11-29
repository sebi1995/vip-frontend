import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  isDraft = false;
  draftBookingData: any;
  bookingDataType: any = 'draft';
  constructor() { }

  setType(data) {
    this.bookingDataType = data;
  }
  getType() {
    return this.bookingDataType;
  }
  setDraftBookingData(data) {
    this.isDraft = true;
    this.draftBookingData = data;
  }
  resetData() {
    this.isDraft = false;
    this.bookingDataType = null;
    this.draftBookingData = {};
  }
  getDraftBookingData() {
    return this.draftBookingData;
  }
}
