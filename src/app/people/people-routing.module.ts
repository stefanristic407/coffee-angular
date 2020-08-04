import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './add-members/add-members.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PeopleComponent } from './people.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {PDirectMessagingComponent} from './p-direct-messaging/p-direct-messaging.component';


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
      path: 'p-direct-messaging',
      component:PDirectMessagingComponent
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
