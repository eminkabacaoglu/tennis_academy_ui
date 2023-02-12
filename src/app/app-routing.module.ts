import { PaymentTypesCreateComponent } from './payment-types/payment-types-create/payment-types-create.component';
import { PaymentTypesDetailComponent } from './payment-types/payment-types-detail/payment-types-detail.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { MembershipStatusDetailComponent } from './membership-status/membership-status-detail/membership-status-detail.component';
import { MembershipStatusCreateComponent } from './membership-status/membership-status-create/membership-status-create.component';
import { MembershipStatusComponent } from './membership-status/membership-status.component';
import { MemberTypesComponent } from './member-types/member-types.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MemberTypesDetailsComponent } from './member-types/member-types-details/member-types-details.component';
import { MemberTypesCreateComponent } from './member-types/member-types-create/member-types-create.component';

const routes: Routes = [
  {path: '', redirectTo: 'members', pathMatch:'full'},
  {path: 'members',component:MembersComponent},
  {path: 'members/create',component:MemberCreateComponent},
  {path: 'members/:memberId',component:MemberDetailsComponent},
  {path: 'member-types',component:MemberTypesComponent},
  {path: 'member-types/create',component:MemberTypesCreateComponent},
  {path: 'member-types/:typeId',component:MemberTypesDetailsComponent},
  {path: 'membership-status',component:MembershipStatusComponent},
  {path: 'membership-status/create',component:MembershipStatusCreateComponent},
  {path: 'membership-status/:statusId',component:MembershipStatusDetailComponent},
  {path: 'payment-types',component:PaymentTypesComponent},
  {path: 'payment-types/:paymentTypeId',component:PaymentTypesDetailComponent},
  {path: 'payment-types/create',component:PaymentTypesCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules,
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
