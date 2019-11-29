import gql from 'graphql-tag';

export const user = gql`
  query user {
    user {
      email
      fname
      lname
    }
  }
`;

export const CountryAirports = gql`
  query CountryAirports($limit: Int, $search: String!, $all: Boolean) {
    searchCountries(args: { limit: $limit, search: $search, all: $all }) {
      countryNames {
        countryCode
        countryName
      }
    }
  }
`;
export const getAirports = gql`
  query getAirports($countryID: String!) {
    getAirports(args: { countryID: $countryID }) {
      airportCode
      airportName
    }
  }
`;

export const getPartnersForUpdate = gql`
  query getAllPartners($id: ID) {
    getPartners(args: { _id: $id }) {
      companyName
      companyEmail
      companyContact
      active
      preferred
      _id
      notes
      pocEmail
      pocName
      pocContact
      partnerCurrency
      ccEmails
      packages {
        _id
        notes
        airport {
          airportName
          airportCode
        }
        country {
          countryName
          countryCode
        }
        priceList {
          cost
          packageName
        }
      }
    }
  }
`;

export const getPartners = gql`
  query getAllPartners($id: ID) {
    getPartners(args: { _id: $id }) {
      companyName
      companyEmail
      companyContact
      active
      preferred
      _id
      notes
      pocEmail
      ccEmails
      pocName
      pocContact
      partnerCurrency
      packages {
        notes
        airport {
          airportName
          airportCode
        }
        country {
          countryName
          countryCode
        }
        priceList {
          _id
          cost
          packageName
        }
      }
    }
  }
`;

export const searchPartnersAndCountries = gql`
  query searchPartnersAndCountries($name: String!) {
    searchPartners(args: { name: $name }) {
      _id
      companyName
    }
    searchCountries(args: { limit: 10, search: $name }) {
      countryNames {
        countryCode
        countryName
      }
      countryCodes {
        countryCode
        countryName
      }
    }
  }
`;

export const getBookings = gql`
  query getBookings(
    $id: ID
    $status: BookingStatusInput
    $partnerID: ID
    $token: String
  ) {
    getBookings(
      args: {
        _id: $id
        status: $status
        partnerID: $partnerID
        pocToken: $token
      }
    ) {
      _id
      number
      user
      status
      bookingType
      bookingNotes
      transferType
      partner
      partnerID
      country {
        countryName
        countryCode
      }
      airport {
        airportName
        airportCode
      }
      firstName
      lastName
      displayName
      email
      package {
        _id
        packageName
        cost
        currency
      }
      phone
      date
      flightNumber
      time
      pax
      bags
      poc
      pocContact
      epochTime
      transferContact
      bookingNotes
      transferNotes
      departureDate
      departureTime
      departureFlightNumber
      departureEpochTime
      invoice {
        to
        items {
          description
          price
        }
        dueDate
        total
        subTotal
        vat
        date
        currency
      }
    }
  }
`;

export const searchPartnersByCountry = gql`
  query SearchPartnersByCountryAirport(
    $airportCode: String!
    $countryCode: String!
  ) {
    searchPartnersByCountry(
      args: { airportCode: $airportCode, countryCode: $countryCode }
    ) {
      partnerId {
        companyName
        _id
      }
    }
  }
`;

export const getFlightStats = gql`
  query getFlightStat(
    $flightNumber: String!
    $flightDate: FlightDateInputType!
    $flightType: BookingType!
  ) {
    getFlightStat(
      args: {
        flightNumber: $flightNumber
        flightDate: $flightDate
        flightType: $flightType
      }
    )
  }
`;
export const getNotifications = gql`
  query User {
    user {
      notifications {
        _id
        status
        params
        text
        timestamp
      }
    }
  }
`;
