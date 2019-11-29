import { Component, OnInit } from '@angular/core';
import { AdminQueryService } from '../../../../services/graphql/admin/admin-query.service';
@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss'],
})
export class ListPartnerComponent implements OnInit {
  partners: Array<any> = [];
  search: String;
  backupData: any;
  constructor(private adminQuery: AdminQueryService) {}

  ngOnInit() {
    this.adminQuery.getPartners('1', true).subscribe(({ data }) => {
      this.partners = data.getPartners;
      this.backupData = this.partners;
      console.log(this.partners);
    });
  }

  filter(event) {
    console.log(event);
    console.log(this.search);
    this.search.toUpperCase();
    if (event.target.value.length === 0) {
      this.partners = this.backupData;
    } else {
      this.partners = this.partners.filter(item => {
        if (item.companyName !== null) {
          if (
            item.companyName.toUpperCase().includes(this.search.toUpperCase())
          ) {
            return item;
          }
        }
      });
    }
  }
}
