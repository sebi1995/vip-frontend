import gql from 'graphql-tag';

//  auth

export const loginUser = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      fname
    }
  }
`;

export const logout = gql`
  mutation logout {
    logout
  }
`;

export const addPartner = gql`
  mutation addPartner(
    $companyName: String!
    $companyContact: String!
    $companyEmail: String!
    $pocName: String!
    $pocContact: String!
    $pocEmail: String!
    $active: Boolean!
    $preferred: Boolean!
    $partnerColor: String
    $partnerCurrency: String!
    $notes: String
    $packages: [NewPartnerPackageInputType]!
    $ccEmails: [String]
  ) {
    addPartner(
      args: {
        companyName: $companyName
        companyContact: $companyContact
        companyEmail: $companyEmail
        pocName: $pocName
        pocContact: $pocContact
        pocEmail: $pocEmail
        active: $active
        preferred: $preferred
        partnerColor: $partnerColor
        partnerCurrency: $partnerCurrency
        packages: $packages
        notes: $notes
        ccEmails: $ccEmails
      }
    ) {
      companyName
    }
  }
`;
export const updatePartner = gql`
  mutation updatePartner(
    $id: ID!
    $companyContact: String
    $pocName: String
    $pocContact: String
    $pocEmail: String
    $active: Boolean
    $preferred: Boolean
    $partnerColor: String
    $notes: String
    $partnerCurrency: String
    $ccEmails: [String]
  ) {
    updatePartner(
      args: {
        _id: $id
        companyContact: $companyContact
        pocName: $pocName
        pocContact: $pocContact
        pocEmail: $pocEmail
        active: $active
        preferred: $preferred
        partnerColor: $partnerColor
        partnerCurrency: $partnerCurrency
        notes: $notes
        ccEmails: $ccEmails
      }
    ) {
      companyName
    }
  }
`;
export const updatePartnerPackage = gql`
  mutation updatePartnerPackage(
    $id: ID!
    $status: PartnerPackageStatusType
    $country: CountryInputType
    $airport: AirportInputType
    $notes: String
    $priceList: [PartnerPriceListInputType]
  ) {
    updatePartnerPackage(
      args: {
        _id: $id
        status: $status
        country: $country
        airport: $airport
        notes: $notes
        priceList: $priceList
      }
    ) {
      partnerId
      priceList {
        packageName
        cost
      }
    }
  }
`;

//  update booking status

export const updateBookingStatus = gql`
  mutation updateBookingStatus(
    $id: ID!
    $status: BookingStatus!
    $token: String!
  ) {
    updateBookingStatus(args: { id: $id, status: $status, token: $token }) {
      status
    }
  }
`;
//  update booking poc

export const updateBookingPoc = gql`
  mutation updateBookingPoc(
    $id: ID!
    $poc: String!
    $pocContact: String!
    $pocToken: String
  ) {
    updateBookingPoc(
      args: {
        _id: $id
        poc: $poc
        pocContact: $pocContact
        pocToken: $pocToken
      }
    ) {
      poc
      pocContact
    }
  }
`;
export const addBooking = gql`
  mutation AddBooking(
    $draftID: ID
    $partnerID: ID!
    $partner: String!
    $airport: AirportInputType!
    $country: CountryInputType!
    $packages: BookingPackageInputType!
    $bookingType: BookingType!
    $firstName: String!
    $lastName: String!
    $displayName: String!
    $transferContact: String
    $email: String!
    $phone: String!
    $date: String!
    $flightNumber: String!
    $time: String!
    $pax: Int!
    $bags: Int!
    $transferType: TransferType
    $transferNotes: String
    $bookingNotes: String
    $epochTime: String!
    $departureDate: String
    $departureTime: String
    $departureFlightNumber: String
    $departureEpochTime: String
  ) {
    addBooking(
      args: {
        draftID: $draftID
        partnerID: $partnerID
        partner: $partner
        airport: $airport
        country: $country
        package: $packages
        bookingType: $bookingType
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        transferContact: $transferContact
        email: $email
        phone: $phone
        date: $date
        flightNumber: $flightNumber
        time: $time
        pax: $pax
        bags: $bags
        transferType: $transferType
        transferNotes: $transferNotes
        bookingNotes: $bookingNotes
        epochTime: $epochTime
        departureDate: $departureDate
        departureTime: $departureTime
        departureFlightNumber: $departureFlightNumber
        departureEpochTime: $departureEpochTime
      }
    ) {
      _id
      user
      status
      bookingType
      bookingNotes
      transferType
      partner
      partnerID
      package {
        packageName
        cost
      }
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
      phone
      date
      flightNumber
      time
      pax
      bags
      bookingNotes
      transferContact
      transferNotes
      departureDate
      departureTime
      departureFlightNumber
      departureEpochTime
    }
  }
`;
export const editBooking = gql`
  mutation editBooking(
    $_id: ID!
    $partnerID: ID!
    $partner: String!
    $airport: AirportInputType!
    $country: CountryInputType!
    $packages: BookingPackageInputType!
    $bookingType: BookingType!
    $firstName: String!
    $lastName: String!
    $displayName: String!
    $transferContact: String
    $email: String!
    $phone: String!
    $date: String!
    $flightNumber: String!
    $time: String!
    $pax: Int!
    $bags: Int!
    $transferType: TransferType
    $transferNotes: String
    $bookingNotes: String
    $epochTime: String!
    $departureDate: String
    $departureTime: String
    $departureFlightNumber: String
    $departureEpochTime: String
  ) {
    editBooking(
      args: {
        _id: $_id
        partnerID: $partnerID
        partner: $partner
        airport: $airport
        country: $country
        package: $packages
        bookingType: $bookingType
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        transferContact: $transferContact
        email: $email
        phone: $phone
        date: $date
        flightNumber: $flightNumber
        time: $time
        pax: $pax
        bags: $bags
        transferType: $transferType
        transferNotes: $transferNotes
        bookingNotes: $bookingNotes
        epochTime: $epochTime
        departureDate: $departureDate
        departureTime: $departureTime
        departureFlightNumber: $departureFlightNumber
        departureEpochTime: $departureEpochTime
      }
    ) {
      _id
      user
      status
      bookingType
      bookingNotes
      transferType
      partner
      partnerID
      package {
        packageName
        cost
      }
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
      phone
      date
      flightNumber
      time
      pax
      bags
      bookingNotes
      transferContact
      transferNotes
      departureDate
      departureTime
      departureFlightNumber
      departureEpochTime
    }
  }
`;

export const addDraftBooking = gql`
  mutation addDraftBooking(
    $draftID: ID
    $partnerID: ID
    $partner: String
    $airport: AirportInputType
    $country: CountryInputType
    $packages: BookingPackageInputType
    $bookingType: BookingType
    $firstName: String
    $lastName: String
    $displayName: String
    $transferContact: String
    $email: String
    $phone: String
    $date: String
    $flightNumber: String
    $time: String
    $pax: Int
    $bags: Int
    $transferType: TransferType
    $transferNotes: String
    $bookingNotes: String
    $epochTime: String
    $departureDate: String
    $departureTime: String
    $departureFlightNumber: String
    $departureEpochTime: String
  ) {
    addDraftBooking(
      args: {
        draftID: $draftID
        partnerID: $partnerID
        partner: $partner
        airport: $airport
        country: $country
        package: $packages
        bookingType: $bookingType
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        transferContact: $transferContact
        email: $email
        phone: $phone
        date: $date
        flightNumber: $flightNumber
        time: $time
        pax: $pax
        bags: $bags
        transferType: $transferType
        transferNotes: $transferNotes
        bookingNotes: $bookingNotes
        epochTime: $epochTime
        departureDate: $departureDate
        departureTime: $departureTime
        departureFlightNumber: $departureFlightNumber
        departureEpochTime: $departureEpochTime
      }
    ) {
      _id
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
      phone
      date
      flightNumber
      time
      pax
      bags
      bookingNotes
      transferContact
      transferNotes
      departureDate
      departureTime
      departureFlightNumber
      departureEpochTime
    }
  }
`;

export const resendBookingEmail = gql`
  mutation resendBookingEmail($_id: ID!) {
    resendBookingEmail(args: { _id: $_id })
  }
`;

export const updateInvoice = gql`
  mutation UpdateInvoice(
    $_id: ID!
    $to: String!
    $total: String!
    $date: String!
    $dueDate: String!
    $items: [InvoiceItemsInputType]!
    $subTotal: String!
    $vat: String!
    $currency: String!
  ) {
    updateInvoice(
      args: {
        _id: $_id
        to: $to
        date: $date
        dueDate: $dueDate
        items: $items
        total: $total
        subTotal: $subTotal
        vat: $vat
        currency: $currency
      }
    ) {
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
    }
  }
`;

export const sendInvoice = gql`
  mutation sendInvoice($_id: ID!) {
    sendInvoice(args: { _id: $_id })
  }
`;
