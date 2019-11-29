import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  addPartner,
  updatePartner,
  updateBookingStatus,
  addBooking,
  resendBookingEmail,
  addDraftBooking,
  updateBookingPoc,
  editBooking,
  updateInvoice,
  sendInvoice,
  updatePartnerPackage,
} from '../mutation';
@Injectable({
  providedIn: 'root',
})
export class AdminMutationService {
  constructor(private router: Router, private apollo: Apollo) {}

  addPartner({
    companyName,
    companyContact,
    companyEmail,
    pocName,
    pocContact,
    pocEmail,
    active,
    preferred,
    partnerColor,
    partnerCurrency,
    packages,
    notes,
    ccEmails,
  }) {
    return this.apollo.mutate({
      mutation: addPartner,
      variables: {
        companyName,
        companyContact,
        companyEmail,
        pocName,
        pocContact,
        pocEmail,
        active,
        preferred,
        partnerColor,
        partnerCurrency,
        packages,
        notes,
        ccEmails,
      },
    });
  }

  updatePartner({
    id,
    companyName,
    companyContact,
    companyEmail,
    pocName,
    pocContact,
    pocEmail,
    active,
    preferred,
    partnerColor,
    partnerCurrency,
    notes,
    packages,
    ccEmails,
  }) {
    return this.apollo.mutate({
      mutation: updatePartner,
      variables: {
        id,

        companyContact,
        notes,
        pocName,
        pocContact,
        pocEmail,
        active,
        preferred,
        partnerColor,
        partnerCurrency,
        ccEmails,
      },
    });
  }
  updatePackages({ id, country, airport, notes, priceList }) {
    return this.apollo.mutate({
      mutation: updatePartnerPackage,
      variables: {
        id,
        country,
        airport,
        notes,
        priceList,
      },
    });
  }
  resendBookingEmail(_id) {
    console.log(_id);
    return this.apollo.mutate({
      mutation: resendBookingEmail,
      variables: {
        _id,
      },
    });
  }

  updateBookingStatus(id, status, token) {
    return this.apollo.mutate({
      mutation: updateBookingStatus,
      variables: {
        status,
        id,
        token,
      },
    });
  }
  updateBookingPoc(id, poc, pocContact, pocToken) {
    return this.apollo.mutate({
      mutation: updateBookingPoc,
      variables: {
        id,
        poc,
        pocContact,
        pocToken,
      },
    });
  }

  addBooking(
    draftID,
    partnerID,
    partner,
    airport,
    country,
    packages,
    bookingType,
    firstName,
    lastName,
    displayName,
    transferContact,
    email,
    phone,
    date,
    flightNumber,
    time,
    pax: Number,
    bags: Number,
    transferType,
    transferNotes,
    bookingNotes,
    epochTime,
    departureDate,
    departureTime,
    departureFlightNumber,
    departureEpochTime
  ) {
    console.log(partnerID, packages);
    return this.apollo.mutate({
      mutation: addBooking,
      variables: {
        draftID,
        partnerID,
        partner,
        airport,
        country,
        packages,
        bookingType,
        firstName,
        lastName,
        displayName,
        transferContact,
        email,
        phone,
        date,
        flightNumber,
        time,
        pax,
        bags,
        transferType,
        transferNotes,
        bookingNotes,
        epochTime,
        departureDate,
        departureTime,
        departureFlightNumber,
        departureEpochTime,
      },
    });
  }

  editBooking(
    _id,
    partnerID,
    partner,
    airport,
    country,
    packages,
    bookingType,
    firstName,
    lastName,
    displayName,
    transferContact,
    email,
    phone,
    date,
    flightNumber,
    time,
    pax: Number,
    bags: Number,
    transferType,
    transferNotes,
    bookingNotes,
    epochTime,
    departureDate,
    departureTime,
    departureFlightNumber,
    departureEpochTime
  ) {
    console.log(partnerID, packages);
    return this.apollo.mutate({
      mutation: editBooking,
      variables: {
        _id,
        partnerID,
        partner,
        airport,
        country,
        packages,
        bookingType,
        firstName,
        lastName,
        displayName,
        transferContact,
        email,
        phone,
        date,
        flightNumber,
        time,
        pax,
        bags,
        transferType,
        transferNotes,
        bookingNotes,
        epochTime,
        departureDate,
        departureTime,
        departureFlightNumber,
        departureEpochTime,
      },
    });
  }

  addDraftBooking(
    draftID,
    partnerID,
    partner,
    airport,
    country,
    packages,
    bookingType,
    firstName,
    lastName,
    displayName,
    transferContact,
    email,
    phone,
    date,
    flightNumber,
    time,
    pax: Number,
    bags: Number,
    transferType,
    transferNotes,
    bookingNotes,
    epochTime,
    departureDate,
    departureTime,
    departureFlightNumber,
    departureEpochTime
  ) {
    console.log(bookingType, transferType);
    return this.apollo.mutate({
      mutation: addDraftBooking,
      variables: {
        draftID,
        partnerID,
        partner,
        airport,
        country,
        packages,
        bookingType,
        firstName,
        lastName,
        displayName,
        transferContact,
        email,
        phone,
        date,
        flightNumber,
        time,
        pax,
        bags,
        transferType,
        transferNotes,
        bookingNotes,
        epochTime,
        departureDate,
        departureTime,
        departureFlightNumber,
        departureEpochTime,
      },
    });
  }
  updateInvoice({
    _id,
    to,
    total,
    date,
    dueDate,
    items,
    subTotal,
    vat,
    currency,
  }) {
    return this.apollo.mutate({
      mutation: updateInvoice,
      variables: {
        _id,
        to,
        total,
        date,
        dueDate,
        items,
        subTotal,
        vat,
        currency,
      },
    });
  }

  sendInvoice(_id) {
    console.log(_id);
    return this.apollo.mutate({
      mutation: sendInvoice,
      variables: {
        _id,
      },
    });
  }
}
