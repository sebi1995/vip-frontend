import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
})
export class EventCalendarComponent implements OnInit, OnChanges {
  @Input() bookingData: any;
  constructor() {}

  options: OptionsInput;
  eventsModel: any;
  eventArray: Array<any> = [];
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  ngOnInit() {
    this.options = {
      editable: true,

      themeSystem: 'bootstrap',
      // events: [
      //   {
      //     title: 'Long Event',
      //     start: '2019-04-04T14:30:00',
      //     end: this.yearMonth + '-10',
      //     color: '#FFC801',
      //   },
      //   {
      //     title: 'Ayush ',
      //     start: '2019-04-20T01:30:00',
      //     end: '2019-04-20T03:30:00',
      //     color: '#FF7051',
      //   },
      //   {
      //     title: ' VIP Conference ',
      //     start: this.yearMonth + '-19',
      //     end: this.yearMonth + '-19',
      //     color: '#35BEDF',
      //   },
      // ],
      // events: this.eventArray,
      // customButtons: {
      //   myCustomButton: {
      //     text: 'custom!',
      //     click: function() {
      //       alert('clicked the custom button!');
      //     },
      //   },
      // },
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        bootstrapPlugin,
      ],
    };
  }
  eventClick(model) {
    console.log(model);
    console.log('event');
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateEvents() {
    console.log('uuuuu');
    this.eventsModel = this.eventArray;
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  ngOnChanges() {
    console.log(this.bookingData);
    this.bookingData.map(async (d, i) => {
      if (d.status === 'Active') {
        const dateTime = await this.parseFlightDate(d.date, d.time);
        const event = {
          title: `${d.firstName} ${d.lastName}`,
          start: `${dateTime}T${d.time}`,
          end: `${dateTime}T${d.time}`,
          color: '#ffb058',
        };
        this.eventArray.push(event);
        if (d.departureFlightNumber) {
          const departureDateTime = await this.parseFlightDate(
            d.departureDate,
            d.departureTime
          );
          const departureEvent = {
            title: `${d.firstName} ${d.lastName}`,
            start: `${departureDateTime}T${d.departureTime}`,
            end: `${departureDateTime}T${d.departureTime}`,
            color: '#ffb058',
          };
          this.eventArray.push(departureEvent);
        }
        console.log(this.eventArray);
      }
    });
    this.updateEvents();
  }

  parseFlightDate = async (dateObj, timeObj) => {
    const momentObj = moment(dateObj, 'DD/MM/YYYY');
    const date = momentObj.format('YYYY-MM-DD');
    // const momentTimeObj = moment(timeObj, 'LTS');
    // const time = momentTimeObj.format('HH:mm:ss');
    const dateTime = `${date}`;
    return dateTime;
  };
}
