import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './people.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [{
   path: '', 
   component: PeopleComponent,
   children: [
     {
      path: 'create-role',
      component:CreateRoleComponent
     },
     { path: 'create-role/:id',
     component:CreateRoleComponent
    },
     {
      path: 'add-members',
      component:AddMembersComponent
     },
     {
      path: 'edit-members',
      component:EditMembersComponent
     },
     {
      path: 'user-management',
      component:UserManagementComponent
     },
     {
      path: 'manage-role',
      component:ManageRoleComponent
     },
     {
      path: '',
      redirectTo: 'create-role',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: PagenotfoundComponent
    }
    
   ]
   }
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
