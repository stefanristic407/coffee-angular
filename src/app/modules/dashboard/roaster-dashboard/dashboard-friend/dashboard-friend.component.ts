import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';

@Component({
  selector: 'app-dashboard-friend',
  templateUrl: './dashboard-friend.component.html',
  styleUrls: ['./dashboard-friend.component.scss'],
})
export class DashboardFriendComponent implements OnInit {
  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
