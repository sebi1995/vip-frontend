import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  CountryAirports,
  getAirports,
  getPartners,
  searchPartnersAndCountries,
  searchPartnersByCountry,
  getBookings,
  getFlightStats,
  getNotifications,
  getPartnersForUpdate,
} from '../query';
@Injectable({
  providedIn: 'root',
})
export class AdminQueryService {
  constructor(private router: Router, private apollo: Apollo) {}
  //  get countries
  getCountryAirports({ limit, search, all }) {
    return this.apollo.watchQuery<any>({
      query: CountryAirports,
      variables: {
        limit,
        search,
        all,
      },
    }).valueChanges;
  }
  //  get airport of that country
  getAirports(countryID) {
    return this.apollo.watchQuery<any>({
      query: getAirports,
      variables: {
        countryID,
      },
    }).valueChanges;
  }

  getPartners(id, all) {
    if (all) {
      return this.apollo.watchQuery<any>({
        query: getPartners,
      }).valueChanges;
    } else {
      return this.apollo.watchQuery<any>({
        query: getPartners,
        variables: { id },
      }).valueChanges;
    }
  }

  getPartnersForUpdate(id, all) {
    if (all) {
      return this.apollo.watchQuery<any>({
        query: getPartnersForUpdate,
      }).valueChanges;
    } else {
      return this.apollo.watchQuery<any>({
        query: getPartnersForUpdate,
        variables: { id },
      }).valueChanges;
    }
  }

  getBookings({ id, status, partnerID, token }: any) {
    console.log({ id, status, partnerID });
    return this.apollo.watchQuery<any>({
      query: getBookings,
      variables: {
        id,
        status,
        partnerID,
        token,
      },
    }).valueChanges;
  }

  getFlightStats({ flightNumber, flightDate, flightType }) {
    // console.log({ flightNumber, flightDate, flightType });
    return this.apollo.watchQuery<any>({
      query: getFlightStats,
      variables: {
        flightNumber,
        flightDate,
        flightType,
      },
    }).valueChanges;
  }

  searchPartnersAndCountries(name) {
    return this.apollo.watchQuery<any>({
      query: searchPartnersAndCountries,
      variables: { name },
    }).valueChanges;
  }

  searchPartnersByCountry(airportCode, countryCode) {
    return this.apollo.watchQuery<any>({
      query: searchPartnersByCountry,
      variables: { airportCode, countryCode },
    }).valueChanges;
  }

  // get notification
  getNotifications() {
    return this.apollo.watchQuery<any>({
      query: getNotifications,
    }).valueChanges;
  }
}
