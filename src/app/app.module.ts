import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//  apollo

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// environment
import { environment } from '../environments/environment';

//  npm packages
import { CookieService } from 'ngx-cookie-service';
import { onError } from 'apollo-link-error';
import { BookingStatusComponent } from './pages/status/booking-status/booking-status.component';
import { UpdateBookingPocComponent } from './pages/status/update-booking-poc/update-booking-poc.component';
import { FormsModule } from '@angular/forms';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(message));
  }
  if (networkError) {
    console.log(networkError.message, networkError.name);
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};
@NgModule({
  declarations: [AppComponent, BookingStatusComponent, UpdateBookingPocComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [
    CookieService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
            addTypename: false,
          }),
          defaultOptions: defaultOptions,
          link: errorLink.concat(
            httpLink.create({
              uri: environment.appUrl,
              withCredentials: true,
            })
          ),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
