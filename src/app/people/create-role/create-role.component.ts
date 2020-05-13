import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  role : String;
  roleError :any;
  files : TreeNode[];

  selectedFile: TreeNode[];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.roleError='';
    this.files = 
      [
          {
              "label": "Sourcing Module",
              "key": "Sourcing Module",
              "data": "Sourcing Module",
              "expanded": true,
              "children": [{"label": "HoReCa", "data": "HoReCa", "key": "HoReCa", }, {"label": "Roaster", "data": "Roaster", "key": "Roaster",}]
          },
          {
            "label": "Order Management",
            "key": "Order Management",
            "data": "Order Management",
            "expanded": true,
            "children": [
              {"label": "HoReCa", "data": "HoReCa", "key": "HoReCa2",}, 
              {"label": "Roaster", "data": "Roaster", "key": "Roaster2",}]
          }
      ];

//Data End

  }
  onKeyPress(event:any){
    if(event.target.value == "") {
      document.getElementById(event.target.id).style.border= "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border= "1px solid #E8E8E8";
    }
  }

  roleAdd(){
    if(this.role == "" || this.role == null || this.role == undefined){
      this.roleError="Please enter your role";
      document.getElementById('roleName').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.roleError="";
      },3000);
      }else {
        this.router.navigate(["people/manage-role"]);

      }
    
  }

}
