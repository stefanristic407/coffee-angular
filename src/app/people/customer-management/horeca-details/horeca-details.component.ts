import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horeca-details',
  templateUrl: './horeca-details.component.html',
  styleUrls: ['./horeca-details.component.css']
})
export class HorecaDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });
  }

}
