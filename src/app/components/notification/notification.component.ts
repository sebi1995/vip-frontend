import { Component, OnInit } from '@angular/core';
import { AdminQueryService } from '../../services/graphql/admin/admin-query.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: any;
  constructor(private adminQuery: AdminQueryService) {}

  ngOnInit() {
    this.adminQuery.getNotifications().subscribe(({ data }) => {
      this.notifications = data.user.notifications;
      console.log(this.notifications);
    });
  }
}
