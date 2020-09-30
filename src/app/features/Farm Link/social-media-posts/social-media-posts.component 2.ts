import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.css']
})
export class SocialMediaPostsComponent implements OnInit {
  modalRef: BsModalRef;
  blogResult: string;

  constructor(private modalService: BsModalService, private route : ActivatedRoute) { }
  @ViewChild('imagetemplate') private imagetemplate: any;
  @ViewChild('videotemplate') private videotemplate: any;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  ngOnInit(): void {
    this.blogResult = decodeURIComponent(this.route.snapshot.queryParams['data']);
    if(this.blogResult == "true"){
    $('#pills-blogs-tab')[0].click();
    }
  }

  imagesModal(){
    this.openModal(this.imagetemplate);
  }

  videosModal(){
    this.openModal(this.videotemplate);
  }

}
