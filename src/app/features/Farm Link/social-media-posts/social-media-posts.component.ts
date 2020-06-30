import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.css']
})
export class SocialMediaPostsComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  @ViewChild('imagetemplate') private imagetemplate: any;
  @ViewChild('videotemplate') private videotemplate: any;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  ngOnInit(): void {
  }

  imagesModal(){
    this.openModal(this.imagetemplate);
  }

  videosModal(){
    this.openModal(this.videotemplate);
  }

}
