import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {


  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;

  mainData:any[] = [
    {
      
      name: 'Tres Santos',
      origin: 'Colombia',
      estateName: 'Finca la pampa',
      roastLevel:'Medium',
      weight:'16 lb',
      status: 'In Stock',
      price: '$44.56'
    },
    {
      
      name: 'Tres Santos',
      origin: 'Colombia',
      estateName: 'Finca la pampa',
      roastLevel:'Medium- light',
      weight:'25 lb',
      status: 'In Stock',
      price: '$44.56'
    },
    {
      
      name: 'Tres Santos',
      origin: 'Colombia',
      estateName: 'Finca La Toboba',
      roastLevel:'Dark',
      weight:'16 lb',
      status: 'Sold',
      price: '$44.56'
    },
    {
      
      name: 'Tres Santos',
      origin: 'Colombia',
      estateName: 'Finca la pampa',
      roastLevel:'Medium',
      weight:'16 lb',
      status: 'In Stock',
      price: '$44.56'
    }
   
  ]
  roleData: string;
  roleID: string;
  showOrigin: boolean = true;
  showType: boolean = true;
  termOrigin: any;
  termType: any;

 
  constructor() {
    this.termStatus = '';
    this.termRole = '';
    this.termOrigin = '';
    this.termType = '';
   }

  ngOnInit(): void {
  }

  // setTeamRole(term: any, roleId: any) {
  //   this.teamRole = term;
  //   this.role_id = roleId;
  // }
 // Function Name : Status Filiter
  // Description: This function helps to filiter the users based on the selected status fiiter.

  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }

  // Function Name : Roles Filiter
  // Description: This function helps to filiter the users based on the selected roles fiiter. 

  // setRole(term: any) {
  //   this.termRole = term;
  // }

  setOrigin(term: any) {
    this.termOrigin = term;
  }
  setType(term: any) {
    this.termType = term;
  }
  // toggleRole() {
  //   this.showRole = !this.showRole;
  //   if(this.showRole==false){
  //     document.getElementById('role_id').style.border="1px solid #30855c";
  //   }
  //   else{
  //     document.getElementById('role_id').style.border="1px solid #d6d6d6";
    
  //   }
  //  }
  
   toggleStatus() {
    this.showVar = !this.showVar;
    if(this.showVar==false){
    document.getElementById('status_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('status_id').style.border="1px solid #d6d6d6";
  
  }
  }

    
  toggleType() {
    this.showType = !this.showType;
    if(this.showType==false){
    document.getElementById('type_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('type_id').style.border="1px solid #d6d6d6";
  
  }
  }
    
  toggleOrigin() {
    this.showOrigin = !this.showOrigin;
    if(this.showOrigin==false){
    document.getElementById('origin_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('origin_id').style.border="1px solid #d6d6d6";
  
  }
  }

  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.mainData.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    return this.mainData.every(_ => _.state);
  } 


}
