import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-origin-post',
  templateUrl: './origin-post.component.html',
  styleUrls: ['./origin-post.component.scss']
})
export class OriginPostComponent implements OnInit {
  @Input() content: any;

  constructor() { }

  ngOnInit(): void {
  }

}
