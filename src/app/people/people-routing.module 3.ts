import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './add-members/add-members.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PeopleComponent } from './people.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PDirectMessagingComponent} from './p-direct-messaging/p-direct-messaging.component';
import { CustomerManagementComponent} from './customer-management/customer-management.component';
import { MicroRoasterDetailsComponent} from './customer-management/micro-roaster-details/micro-roaster-details.component';
import { HorecaDetailsComponent} from './customer-management/horeca-details/horeca-details.component';
import { DiscountEditComponent} from './customer-management/discount-edit/discount-edit.component';
import { from } from 'rxjs';
import { TeamMembersComponent } from './team-members/team-members.component';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { PageNotFoundComponent } from '../error-module/page-not-found/page-not-found.component';
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
      path: 'customer-management',
      component:CustomerManagementComponent
     },
     {
      path: 'micro-roaster-details',
      component:MicroRoasterDetailsComponent
     },
     {
      path: 'horeca-details',
      component:HorecaDetailsComponent
     },
     {
      path: 'discount-edit',
      component:DiscountEditComponent
     },
     {
      path: 'team-members',
      component:TeamMembersComponent
     },
     {
       path:'invite-member',
       component:InviteMemberComponent
     },
     {
      path: '',
      redirectTo: 'create-role',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
    
   ]
   }
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
