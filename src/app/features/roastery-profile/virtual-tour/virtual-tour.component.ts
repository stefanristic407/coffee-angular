import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { YourServicesService } from 'src/services/your-services/your-services.service';
import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'sewn-virtual-tour',
  templateUrl: './virtual-tour.component.html',
  styleUrls: ['./virtual-tour.component.css']
})
export class VirtualTourComponent implements OnInit {
  appLanguage: any;
  tourImages: any = [];

  constructor(
    public roasteryProfileService: RoasteryProfileService,
    public globals: GlobalsService,
    private yourService: YourServicesService,
    private toasterService: ToastrService,
    private userService: UserserviceService
  ) { }

  async ngOnInit() {
    const lang = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en';
    this.globals.languageJson = await this.userService.getLanguageStrings(lang);
    this.appLanguage = this.globals.languageJson;
    this.getFiles();
  }

  getFiles(){
    this.yourService.getMyFiles().subscribe( res => {
      if (res.success){
        this.tourImages = res.result;
      }
    });
  }

  addFile(data){
    this.yourService.addFile(data).subscribe( res => {
      if (res.success){
        this.getFiles();
      }
    });
  }
  handleFile(e) {
    if (e.target.files.length > 0) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        const fsize = e.target.files.item(i).size;
        const file = Math.round((fsize / 1024));
        // The size of the file.
        if (file >= 2048) {
          this.toasterService.error('File too big, please select a file smaller than 2mb');
        }else {
          const image = e.target.files[0];
          const File = new FormData();
          File.append('name', image.name);
          File.append('file', image);
          File.append('file_module', 'Virtual-Tour');
          this.addFile(File);
        }
      }
    }
  }


}
