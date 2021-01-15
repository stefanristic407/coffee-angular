import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute } from "@angular/router";
import { GlobalsService } from "src/services/globals.service";
import { UserserviceService } from "src/services/users/userservice.service";
import { ToastrService } from "ngx-toastr";

import * as Plyr from "plyr";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-social-media-posts",
  templateUrl: "./social-media-posts.component.html",
  styleUrls: ["./social-media-posts.component.css"],
})
export class SocialMediaPostsComponent implements OnInit {
  modalRef: BsModalRef;
  blogResult: string;
  appLanguage?: any;
  imagesListArray: any = [];
  videosListArray: any = [];
  imageDescription: any;
  imageUrl: any;
  imageOwner: any;
  videoOwner: any;
  videoUrl: any;
  videoDescription: any;
  roaster_id: string;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    public globals: GlobalsService,
    private cookieService: CookieService,
    private userService: UserserviceService,
    private toastrService: ToastrService
  ) {
    this.roaster_id = this.cookieService.get("roaster_id");
  }

  @ViewChild("imagetemplate") private imagetemplate: any;
  @ViewChild("videotemplate") private videotemplate: any;

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);

  // }

  ngOnInit(): void {
    this.blogResult = decodeURIComponent(
      this.route.snapshot.queryParams["data"]
    );
    if (this.blogResult == "true") {
      $("#pills-blogs-tab")[0].click();
    }

    this.appLanguage = this.globals.languageJson;
    this.getSocialImages();
    this.getSocialVideos();
  }

  imagesModal(template: TemplateRef<any>, items: any) {
    this.modalRef = this.modalService.show(template);
    this.imageDescription = items.description;
    this.imageUrl = items.url;
    this.imageOwner = items.owner_name;
  }

  videosModal(template: TemplateRef<any>, items: any) {
    this.modalRef = this.modalService.show(template);
    this.videoDescription = items.description;
    this.videoUrl = items.url;
    this.videoOwner = items.owner_name;
  }
  videoPopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    const player = new Plyr("#player");
    $(".popup-video").parents(".modal-content").addClass("video-content");
  }
  closePopup() {
    this.modalRef.hide();
  }
  toggleVideo(event: any) {
    // this.videoplayer.nativeElement.play();
    event.toElement.play();
  }

  getSocialImages() {
    this.userService
      .getSocialMediaPosts(this.roaster_id, "IMAGE")
      .subscribe((response) => {
        if (response["success"] == true) {
          this.imagesListArray = response["result"];
          console.log(this.imagesListArray);
        } else {
          this.toastrService.error("Error While loading the Images");
        }
      });
  }
  getSocialVideos() {
    this.userService
      .getSocialMediaPosts(this.roaster_id, "VIDEO")
      .subscribe((response) => {
        if (response["success"] == true) {
          this.videosListArray = response["result"];
          console.log(this.videosListArray);
        } else {
          this.toastrService.error("Error While loading the Videos");
        }
      });
  }
}
