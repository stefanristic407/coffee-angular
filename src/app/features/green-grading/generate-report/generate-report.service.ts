import { Injectable } from "@angular/core";
import { RoasteryProfileService } from "../../roastery-profile/roastery-profile.service";

@Injectable({
  providedIn: "root",
})
export class GenerateReportService {
  cuppingDetails: any;
  fromQueryParam: any;
  serviceRequestsList: any = [];

  constructor(public roasteryProfileService: RoasteryProfileService) {}
  getCountryName(data: any) {
    return this.roasteryProfileService.countryList.find(
      (con) => con.isoCode == data
    ).name;
  }
}
