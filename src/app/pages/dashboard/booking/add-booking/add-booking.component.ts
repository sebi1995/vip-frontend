import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminQueryService } from 'src/app/services/graphql/admin/admin-query.service';
import { AdminMutationService } from 'src/app/services/graphql/admin/admin-mutation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { CountryListService } from 'src/app/services/country-codes/country-list.service';

declare const $;

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent implements OnInit {
  bookingForm: FormGroup;
  partnersAndCountriesList: any[];
  lastkeydown1: any = 0;
  firstInput = 'partner';
  partner: any;
  airportList: any[] = [];
  countryCode: any;
  partnerList: any;
  packagePrices: any[];
  countryList: any[];
  typeList = [
    { name: 'Arrival', value: 'Arrival' },
    { name: 'Departure', value: 'Departure' },
    { name: 'Connecting', value: 'Connecting' }
  ];
  transferType = [
    { name: 'None', value: 'None' },
    { name: 'Chauffeur', value: 'Chauffeur' },
    // { name: 'Metro', value: 'Metro' },
    // { name: 'Coach', value: 'Coach' },
    { name: 'VIProtocol', value: 'VIProtocol' },
  ];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'
     ];
  finalCountryObj: any;
  countryObj: any;
  airportObj: any;
  packageObj: any;
  draftId: any;
  draftBookingData: any;
  bookingDataType: any = 'draft';
  currency: any;
  backupAirportCountryList: any[];
  constructor(
    private fb: FormBuilder,
    private adminQuery: AdminQueryService,
    private adminMutation: AdminMutationService,
    private router: Router,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private countryListService: CountryListService
  ) {}

  compareFn(c1: any, c2: any): boolean {
    console.log(c1, c2);
    return c1 && c2 ? c1.countryName === c2.countryName : c1 === c2;
  }

  async fetch(data) {
    console.log(data);
    this.partnersAndCountriesList = [];
    const name = (<HTMLInputElement>document.getElementById('userIdFirstWay'))
      .value;
    if (data.timeStamp - this.lastkeydown1 > 200) {
      await this.adminQuery.searchPartnersAndCountries(name).subscribe(res => {
        let countryCodes = res.data.searchCountries.countryCodes;
        let countryNames = res.data.searchCountries.countryNames;
        let partners = res.data.searchPartners;
        countryCodes = countryCodes.map(item => {
          const container = {};
          container['id'] = item.countryCode;
          container['name'] = item.countryName;
          container['type'] = 'country';
          return container;
        });
        countryNames = countryNames.map(item => {
          const container = {};
          container['id'] = item.countryCode;
          container['name'] = item.countryName;
          container['type'] = 'country';
          return container;
        });
        partners = partners.map(item => {
          const container = {};
          container['id'] = item._id;
          container['name'] = item.companyName;
          container['type'] = 'partner';
          return container;
        });
        this.partnersAndCountriesList = [
          ...countryCodes,
          ...countryNames,
          ...partners,
        ];
      });
    }
    this.lastkeydown1 = data.timeStamp;
  }

  async fetchDraftPartners(name) {
    await this.adminQuery.searchPartnersAndCountries(name).subscribe(res => {
      console.log(res);
      let countryCodes = res.data.searchCountries.countryCodes;
      let countryNames = res.data.searchCountries.countryNames;
      let partners = res.data.searchPartners;
      countryCodes = countryCodes.map(item => {
        const container = {};
        container['id'] = item.countryCode;
        container['name'] = item.countryName;
        container['type'] = 'country';
        return container;
      });
      countryNames = countryNames.map(item => {
        const container = {};
        container['id'] = item.countryCode;
        container['name'] = item.countryName;
        container['type'] = 'country';
        return container;
      });
      partners = partners.map(item => {
        const container = {};
        container['id'] = item._id;
        container['name'] = item.companyName;
        container['type'] = 'partner';
        return container;
      });
      this.partnersAndCountriesList = [
        ...countryCodes,
        ...countryNames,
        ...partners,
      ];
      this.setDraftPackage();
    });
  }

  selectedItem(item) {
    this.countryList = [];
    this.airportList = [];
    this.packagePrices = [];
    const selected = item.target.value;
    const result = this.partnersAndCountriesList.filter(obj => {
      return obj.name === selected;
    });
    if (result['0'].type === 'country') {
      this.firstInput = 'country';
      this.countryCode = result['0'].id;
      this.bookingForm.controls.country.setValue(result['0'].id);
      this.setCountryCode();
      this.finalCountryObj = result['0'];
      this.getAirports(result['0'].id);
    } else {
      this.firstInput = 'partner';
      this.getPartner(result['0'].id);
    }
  }

  async getPartner(id) {
    this.bookingForm.controls.partner.setValue(id);
    this.partner = [];
    this.countryList = [];
    this.airportList = [];
    this.backupAirportCountryList = [];
    await this.adminQuery.getPartners(id, false).subscribe(res => {
      this.partner = res.data.getPartners;
      console.log('first input is partner');
      console.log(this.partner['0']._id);
      const packages = this.partner['0'].packages;
      packages.forEach(element => {
        console.log(element);
        this.countryList.push(element.country);
        this.backupAirportCountryList.push({ "countryCode": element.country.countryCode, "airport": element.airport});
      });
      console.log(this.backupAirportCountryList);
      if (this.firstInput === 'partner') {
        this.bookingForm.controls.partner.setValue(this.partner['0']._id);
        packages.forEach(element => {
          this.airportList.push(element.airport);
          console.log(this.airportList);
        });
      }
      this.countryList = this.countryList.filter((data, index) => {
        return (
          index ===
          this.countryList.findIndex(obj => {
            return JSON.stringify(obj) === JSON.stringify(data);
          })
        );
      });
      if (this.firstInput === 'country') {
        this.setPackage();
      }
    });
  }
  setPrice() {
    const name = this.bookingForm.controls.package.value;
    const found = this.packagePrices.find(function(element) {
      return element.packageName === name;
    });
    console.log(found);
    this.bookingForm.controls.price.setValue(found.cost);
  }
  async getAirports(id) {
    console.log(id);
    this.airportList = [];
    await this.adminQuery.getAirports(id.toLowerCase()).subscribe(res => {
      this.airportList = res.data.getAirports;
    });
  }

  async getPartnersByCountry(airportCode) {
    console.log(airportCode);
    await this.adminQuery
      .searchPartnersByCountry(airportCode, this.countryCode)
      .subscribe(res => {
        this.partnerList = res.data.searchPartnersByCountry;
        this.partnerList = this.partnerList.map(item => {
          const container = {};
          const newItem = item.partnerId;
          container['id'] = newItem._id;
          container['name'] = newItem.companyName;
          return container;
        });
        console.log('Partner list');
        console.log(this.partnerList);
      });
  }
  setCountryCode() {
    this.airportList = [];
    this.bookingForm.controls.price.setValue([undefined]);
    this.bookingForm.controls.package.setValue([null]);
    const code = this.countryListService.getCode(this.bookingForm.value.country);
    console.log(code);
    this.bookingForm.controls.contact.setValue(code + ' ');
    this.backupAirportCountryList.forEach(element => {
      if (this.bookingForm.controls.country.value === element.countryCode) {
        this.airportList.push(element.airport);
      }
    });
    console.log(this.airportList);
  }

  setData() {
    const packageId = this.bookingForm.controls.price.value;
    this.packageObj = this.packagePrices.find(function(element) {
      return element.cost === packageId;
    });
    console.log('=============package============');
    console.log(this.packageObj);
    this.packageObj = {
      _id: this.packageObj._id,
      packageName: this.packageObj.packageName,
      cost: this.packageObj.cost,
      currency: this.currency
    };
    console.log(this.packageObj);
  }
  setDraftPackage() {
    this.packagePrices = [];
    this.adminQuery.getPartners(this.partnersAndCountriesList['0'].id, false).subscribe( d => {
      this.partner = [d.data.getPartners['0']];
      this.partnersAndCountriesList = [d.data.getPartners['0']];
      const packagesArray = d.data.getPartners['0'].packages['0'];
      console.log('Here');
      this.packagePrices = packagesArray.priceList;
      console.log(packagesArray);
      });
  }
  setPackage() {
    this.packagePrices = [];
    const airportId = this.bookingForm.controls.airport.value;
    const countryId = this.bookingForm.controls.country.value;
    this.airportObj = this.airportList.find(function(element) {
      return element.airportCode === airportId;
    });
    if (this.firstInput === 'country') {
      this.countryObj = this.finalCountryObj;
      this.countryObj = {
        countryCode: this.countryObj.id,
        countryName: this.countryObj.name,
      };
    } else {
      this.countryObj = this.countryList.find(function(element) {
        return element.countryCode === countryId;
      });
    }
    this.partner['0'].packages.forEach(element => {
      if (
        element.airport.airportCode.toUpperCase() ===
          this.airportObj.airportCode.toUpperCase() &&
        element.country.countryCode.toUpperCase() ===
          this.countryObj.countryCode.toUpperCase()
      ) {
        this.packagePrices = element.priceList;
        console.log('hereeeeeeeeeeeeeeee');
        console.log(this.partner['0']);
      }
    });
    this.currency = this.partner['0'].partnerCurrency;
  }
  submitBooking() {
    if (this.draftId !== undefined) {
      this.countryObj = this.draftBookingData.country;
      this.airportObj = this.draftBookingData.airport;
      const name = this.bookingForm.controls.package.value;
      const found = this.packagePrices.find(function(element) {
        return element.packageName === name;
      });
      this.packageObj = found;
      console.log(this.countryObj);
      console.log(this.airportObj);
      console.log(found);
    }
    const d = new Date(this.bookingForm.controls.date.value);
    const t = new Date(this.bookingForm.controls.time.value);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = day + '/' + month + '/' + year;
    const time = t.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    const epocDate = Date.parse(`${day} ${this.monthNames[month - 1]} ${year} ${t.toTimeString()}`).toString();
    console.log(epocDate);
    console.log(epocDate.toString());
    let departureDate;
    let departureTime;
    let departureEpochTime;
    if (this.bookingForm.controls.type.value === 'Connecting') {
      const depDate = new Date(this.bookingForm.controls.departureDate.value);
      const depTime = new Date(this.bookingForm.controls.departureTime.value);
      const depDay = depDate.getDate();
      const depMonth = depDate.getMonth() + 1;
      const depYear = depDate.getFullYear();
      departureDate = depDay + '/' + depMonth + '/' + depYear;
      departureTime = depTime.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
      departureEpochTime = Date.parse(`${depDay} ${this.monthNames[depMonth - 1]} ${depYear} ${depTime.toTimeString()}`).toString();
    }
    this.packageObj.currency = this.currency;
    this.adminMutation
      .addBooking(
        this.draftId,
        this.bookingForm.controls.partner.value,
        this.partner['0'].companyName,
        this.airportObj,
        this.countryObj,
        this.packageObj,
        this.bookingForm.controls.type.value,
        this.bookingForm.controls.firstname.value,
        this.bookingForm.controls.lastname.value,
        this.bookingForm.controls.displayName.value,
        this.bookingForm.controls.transferContact.value,
        this.bookingForm.controls.email.value,
        this.bookingForm.controls.contact.value.length > 5 ? this.bookingForm.controls.contact.value : '',
        date,
        this.bookingForm.controls.flight.value,
        time,
        +this.bookingForm.controls.pax.value,
        +this.bookingForm.controls.bags.value,
        this.bookingForm.controls.transfer.value,
        this.bookingForm.controls.transferNote.value,
        this.bookingForm.controls.bookingNote.value,
        epocDate,
        departureDate,
        departureTime,
        this.bookingForm.controls.departureFlightNumber.value,
        departureEpochTime
      )
      .subscribe(
        res => {
          console.log(res);
          this.bookingForm.reset();
          if (this.draftId) {
            this.draftId = null;
            this.draftBookingData = [];
          }
          this.router.navigate(['./bookings']);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

  submitDraft() {
    if (this.bookingForm.controls.transfer.value === null) {
      this.bookingForm.controls.transfer.setValue(undefined);
    }
    if (this.bookingForm.controls.type.value === null) {
      this.bookingForm.controls.type.setValue(undefined);
    }
    const d = new Date(this.bookingForm.controls.date.value);
    const t = new Date(this.bookingForm.controls.time.value);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = day + '/' + month + '/' + year;
    const time = t.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    const epocDate = Date.parse(`${day} ${this.monthNames[month - 1]} ${year} ${t.toTimeString()}`).toString();
    console.log(this.packageObj);
    let departureDate;
    let departureTime;
    let departureEpochTime;
    if (this.bookingForm.controls.type.value === 'Connecting') {
      const depDate = new Date(this.bookingForm.controls.departureDate.value);
      const depTime = new Date(this.bookingForm.controls.departureTime.value);
      const depDay = depDate.getDate();
      const depMonth = depDate.getMonth() + 1;
      const depYear = depDate.getFullYear();
      departureDate = depDay + '/' + depMonth + '/' + depYear;
      departureTime = depTime.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
      departureEpochTime = Date.parse(`${depDay} ${this.monthNames[depMonth - 1]} ${depYear} ${depTime.toTimeString()}`).toString();
    }
    this.packageObj.currency = this.currency;
    this.adminMutation
      .addDraftBooking(
        this.draftId,
        this.bookingForm.controls.partner.value,
        this.partner['0'].companyName,
        this.airportObj,
        this.countryObj,
        this.packageObj,
        this.bookingForm.controls.type.value,
        this.bookingForm.controls.firstname.value,
        this.bookingForm.controls.lastname.value,
        this.bookingForm.controls.displayName.value,
        this.bookingForm.controls.transferContact.value,
        this.bookingForm.controls.email.value,
        this.bookingForm.controls.contact.value,
        date,
        this.bookingForm.controls.flight.value,
        time,
        this.bookingForm.controls.pax.value,
        this.bookingForm.controls.bags.value,
        this.bookingForm.controls.transfer.value,
        this.bookingForm.controls.transferNote.value,
        this.bookingForm.controls.bookingNote.value,
        epocDate,
        departureDate,
        departureTime,
        this.bookingForm.controls.departureFlightNumber.value,
        departureEpochTime
      )
      .subscribe(
        res => {
          console.log(res);
          this.bookingForm.reset();
          if (this.draftId) {
            this.draftId = null;
            this.bookingService.resetData();
          }
          this.router.navigate(['./bookings']);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

  editBooking() {
    if (this.draftId !== undefined) {
      this.countryObj = this.draftBookingData.country;
      this.airportObj = this.draftBookingData.airport;
      const name = this.bookingForm.controls.package.value;
      const found = this.packagePrices.find(function(element) {
        return element.packageName === name;
      });
      this.packageObj = found;
      console.log(this.countryObj);
      console.log(this.airportObj);
      console.log(found);
    }
    const d = new Date(this.bookingForm.controls.date.value);
    const t = new Date(this.bookingForm.controls.time.value);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = day + '/' + month + '/' + year;
    const time = t.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    const epocDate = Date.parse(`${day} ${this.monthNames[month - 1]} ${year} ${t.toTimeString()}`).toString();
    let departureDate;
    let departureTime;
    let departureEpochTime;
    if (this.bookingForm.controls.type.value === 'Connecting') {
      const depDate = new Date(this.bookingForm.controls.departureDate.value);
      const depTime = new Date(this.bookingForm.controls.departureTime.value);
      const depDay = depDate.getDate();
      const depMonth = depDate.getMonth() + 1;
      const depYear = depDate.getFullYear();
      departureDate = depDay + '/' + depMonth + '/' + depYear;
      departureTime = depTime.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
      departureEpochTime = Date.parse(`${depDay} ${this.monthNames[depMonth - 1]} ${depYear} ${depTime.toTimeString()}`).toString();
    }
    this.packageObj.currency = this.currency;
    console.log('Editing');
    console.log(this.packageObj);
    this.adminMutation
      .editBooking(
        this.draftId,
        this.bookingForm.controls.partner.value,
        this.partner['0'].companyName,
        this.airportObj,
        this.countryObj,
        this.packageObj,
        this.bookingForm.controls.type.value,
        this.bookingForm.controls.firstname.value,
        this.bookingForm.controls.lastname.value,
        this.bookingForm.controls.displayName.value,
        this.bookingForm.controls.transferContact.value,
        this.bookingForm.controls.email.value,
        this.bookingForm.controls.contact.value.length > 5 ? this.bookingForm.controls.contact.value : '',
        date,
        this.bookingForm.controls.flight.value,
        time,
        +this.bookingForm.controls.pax.value,
        +this.bookingForm.controls.bags.value,
        this.bookingForm.controls.transfer.value,
        this.bookingForm.controls.transferNote.value,
        this.bookingForm.controls.bookingNote.value,
        epocDate,
        departureDate,
        departureTime,
        this.bookingForm.controls.departureFlightNumber.value,
        departureEpochTime
      )
      .subscribe(
        res => {
          console.log(res);
          this.bookingForm.reset();
          if (this.draftId) {
            this.draftId = null;
            this.draftBookingData = [];
            this.bookingService.resetData();
          }
          this.router.navigate(['./bookings']);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }
  isDraftBooking() {
   if (this.draftId !== undefined) {
     this.firstInput = 'partner';
     this.adminQuery.getBookings({id: this.draftId}).subscribe(res => {
       this.draftBookingData = res.data.getBookings['0'];
       console.log('Dateeeeeeeeee');
       console.log(this.draftBookingData);
       this.currency = this.draftBookingData.package.currency;
       if (this.draftBookingData.status !== 'Draft') {
        this.bookingDataType = 'edit';
        console.log(this.bookingDataType);
       }
       this.bookingForm.setValue({
        partner: this.draftBookingData.partnerID,
        country: this.draftBookingData.country.countryCode,
        airport: this.draftBookingData.airport.airportCode,
        price: this.draftBookingData.package ? this.draftBookingData.package['cost'] : '',
        package: this.draftBookingData.package ? this.draftBookingData.package['packageName'] : '',
        type: this.draftBookingData.bookingType,
        firstname: this.draftBookingData.firstName,
        lastname: this.draftBookingData.lastName,
        displayName: this.draftBookingData.displayName,
        email: this.draftBookingData.email,
        contact: this.draftBookingData.phone,
        date: new Date( parseFloat(this.draftBookingData.epochTime)),
        flight: this.draftBookingData.flightNumber,
        time: new Date( parseFloat(this.draftBookingData.epochTime)),
        pax: this.draftBookingData.pax,
        bags: this.draftBookingData.bags,
        transfer: this.draftBookingData.transferType,
        transferContact: this.draftBookingData.transferContact ? this.draftBookingData.transferContact : '',
        transferNote: this.draftBookingData.transferNotes,
        bookingNote: this.draftBookingData.bookingNotes,
        partnersAndCountries: this.draftBookingData.partner,
        departureDate: new Date( parseFloat(this.draftBookingData.departureEpochTime)),
        departureTime: new Date( parseFloat(this.draftBookingData.departureEpochTime)),
        departureFlightNumber: this.draftBookingData.departureFlightNumber,
       });
       console.log('package');
       console.log(this.draftBookingData);
       if (this.draftBookingData.package) {
        this.packagePrices = this.draftBookingData.package;
        this.packageObj = this.draftBookingData.package;
        console.log('package');
         console.log(this.packageObj);
        }
        if (this.draftBookingData.partner) {
         this.fetchDraftPartners(this.draftBookingData.partner);
        }
        if (this.draftBookingData.country) {
         this.countryList = [this.draftBookingData.country];
         this.countryObj = this.draftBookingData.country;
         console.log('country');
         console.log(this.countryObj);
        }
        if (this.draftBookingData.airport) {
         this.airportList = [this.draftBookingData.airport];
         this.airportObj = this.draftBookingData.airport;
         console.log('airport');
         console.log(this.airportObj);
        }
     });
   } else if (this.draftId === undefined) {
    this.bookingForm = this.fb.group({
      partner: [null, Validators.required],
      country: [null, Validators.required],
      airport: [null, Validators.required],
      price: [{value: null, disabled: true}, Validators.required],
      package: [null, Validators.required],
      type: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      displayName: [null, Validators.required],
      email: [null, Validators.required],
      contact: [null, Validators.required],
      date: [null, Validators.required],
      flight: [null, Validators.required],
      time: [null, Validators.required],
      pax: [null, Validators.required],
      bags: [null, Validators.required],
      transfer: ['None', Validators.required],
      transferContact: [null, Validators.required],
      transferNote: [null, Validators.required],
      bookingNote: [null, Validators.required],
      partnersAndCountries: [null],
      departureDate: [null],
      departureTime: [null],
      departureFlightNumber: [null],
    });
   }
   console.log(this.draftBookingData);
  }
  ngOnInit() {
    $('.js-datepicker').datepicker({
      autoclose: true,
    });
    this.bookingForm = this.fb.group({
      partner: [null, Validators.required],
      country: [null, Validators.required],
      airport: [null, Validators.required],
      price: [{value: null, disabled: true}, Validators.required],
      package: [null, Validators.required],
      type: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      displayName: [null, Validators.required],
      email: [null, Validators.required],
      contact: [null, Validators.required],
      date: [null, Validators.required],
      flight: [null, Validators.required],
      time: [null, Validators.required],
      pax: [null, Validators.required],
      bags: [null, Validators.required],
      transfer: ['None', Validators.required],
      transferContact: [null, Validators.required],
      transferNote: [null, Validators.required],
      bookingNote: [null, Validators.required],
      partnersAndCountries: [null, Validators.required],
      departureDate: [null],
      departureTime: [null],
      departureFlightNumber: [null],
    });
    this.route
    .queryParams
    .subscribe(params => {
      this.draftId = params.id;
      console.log(this.draftId);
      if (this.draftId !== undefined) {
        this.isDraftBooking();
      }
    });
  }
}
