import { Component, OnInit } from '@angular/core';
import { AdminQueryService } from '../../../services/graphql/admin/admin-query.service';
import { AdminMutationService } from '../../../services/graphql/admin/admin-mutation.service';
import * as moment from 'moment';
declare const $;
enum BookingType {
  Arrival,
  Departure,
  Connecting,
}

enum status {
  'A' = 'Active',
  'C' = 'Canceled',
  'D' = 'Diverted',
  'L' = 'Landed',
  'R' = ' Redirected',
  'S' = 'Scheduled',
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activePartners: any;
  pendingBookings: any;
  activeBookings: any;
  bookingData: any = [];
  data: any = {};
  flightData: any = {
    flightNumber: '',
    flightType: '',
    flightDate: {
      // year: '2019',
      // month: '04',
      // day: '29',
    },
  };

  connectingFlightData: any = {
    flightNumber: '',
    flightType: '',
    flightDate: {
      // year: '2019',
      // month: '04',
      // day: '29',
    },
  };
  flightStats: Array<any> = [{}];

  constructor(
    private adminQuery: AdminQueryService,
    private adminMutation: AdminMutationService
  ) {}

  ngOnInit() {
    this.adminQuery.getBookings(this.data).subscribe(({ data }) => {
      this.bookingData = data.getBookings;
      // console.log(data);
      this.activeBookings = this.bookingData.filter(d => {
        console.log(d.poc);
        return d.status === 'Active';
      });

      this.pendingBookings = this.bookingData.filter(d => {
        return d.status === 'Pending';
      });
      // console.log(data);
      this.activeBookings.map((d: any, i) => {
        this.flightData.flightNumber = d.flightNumber;
        this.flightData.flightType = d.bookingType;
        this.parseFlightDate(d.date, i, false);
        if (d.departureFlightNumber != null) {
          this.connectingFlightData.flightNumber = d.departureFlightNumber;
          this.connectingFlightData.flightType = d.bookingType;
          this.parseFlightDate(d.departureDate, i, true);
        }
      });
    });

    // this.getStats();
  }
  parseFlightDate = async (dateObj, i, connecting) => {
    const momentObj = moment(dateObj, 'DD/MM/YYYY');
    const year = momentObj.format('YYYY');
    const day = momentObj.format('DD');
    const month = momentObj.format('MM');
    if (connecting) {
      this.connectingFlightData.flightDate = {
        year,
        month,
        day,
      };
    } else {
      this.flightData.flightDate = {
        year,
        month,
        day,
      };
    }

    this.getStats(i, connecting);
  };

  getStats = async (i, connecting) => {
    let fdata;
    if (connecting) {
      fdata = await this.connectingFlightData;
    } else {
      fdata = await this.flightData;
    }
    console.log(fdata);
    this.adminQuery.getFlightStats(fdata).subscribe(
      async ({ data }) => {
        const flightAPIData = await JSON.parse(JSON.parse(data.getFlightStat));
        if (!flightAPIData.error) {
          const parsedData = {
            airlines: flightAPIData.appendix.airlines[0].name,
            date: flightAPIData.request.date.interpreted,
            status: status[flightAPIData.flightStatuses[0].status],
            delay: flightAPIData.flightStatuses[0].delays,
            operationalTimes: flightAPIData.flightStatuses[0].operationalTimes,
          };
          this.flightStats.push(parsedData);
          if (connecting) {
            console.log('cond 1 ===>' + connecting);
            this.activeBookings[i]['departureFlightStats'] = parsedData;
          } else {
            console.log('cond 2 ===>' + connecting);
            this.activeBookings[i]['flightStats'] = parsedData;
          }
          console.log(this.activeBookings);
          return this.flightStats;
        }
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  };

  resendEmail(id) {
    console.log(id);
    this.adminMutation.resendBookingEmail(id).subscribe(
      ({ data }) => {
        console.log(data);
        $('#modalSuccess').modal('show');
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  updateBookingStatus(id, i) {
    this.adminMutation.updateBookingStatus(id, 'Completed', 'newtok').subscribe(
      ({ data }) => {
        console.log(data, i);
        this.activeBookings.splice(i, 1);
        console.log(this.activeBookings);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
