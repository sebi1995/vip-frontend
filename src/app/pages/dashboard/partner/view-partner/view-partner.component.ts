import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminQueryService } from '../../../../services/graphql/admin/admin-query.service';
import { AdminMutationService } from '../../../../services/graphql/admin/admin-mutation.service';
declare const $;
// enum currency {
//   dollar:
//   yen:
//   rubble:
//   rupee:
//   euro:
//   pound:
// }
@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['./view-partner.component.scss'],
})
export class ViewPartnerComponent implements OnInit {
  id: any;
  data: any;
  select: any;
  bookingData: any;
  constructor(
    private adminQuery: AdminQueryService,
    private adminMutation: AdminMutationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id !== undefined) {
        this.getData();
      }
    });
  }

  getData() {
    this.adminQuery.getPartners(this.id, false).subscribe(({ data }) => {
      this.data = data.getPartners[0];
      console.log('=============>');
      console.log(this.data);
      this.getBookings(this.data._id);
    });
  }

  getBookings(id) {
    console.log(id);
    const args = {
      id: undefined,
      status: undefined,
      partnerID: id,
    };
    this.adminQuery.getBookings(args).subscribe(
      ({ data }) => {
        console.log('=============>');
        console.log(data);
        this.bookingData = data.getBookings;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
