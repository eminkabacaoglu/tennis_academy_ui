import { StudentTypesComponent } from './student-types/student-types.component';
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
import { StudentTypeCreateComponent } from './student-types/student-type-create/student-type-create.component';
import { StudentTypeDetailsComponent } from './student-types/student-type-details/student-type-details.component';
import { ModuleTypesComponent } from './module-types/module-types.component';
import { ModuleTypesCreateComponent } from './module-types/module-types-create/module-types-create.component';
import { ModuleTypesDetailsComponent } from './module-types/module-types-details/module-types-details.component';
import { LevelsComponent } from './levels/levels.component';
import { LevelsCreateComponent } from './levels/levels-create/levels-create.component';
import { LevelsDetailsComponent } from './levels/levels-details/levels-details.component';
import { StudentsComponent } from './students/students.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { LockersComponent } from './lockers/lockers.component';
import { LockerCreateComponent } from './lockers/locker-create/locker-create.component';
import { LockerDetailsComponent } from './lockers/locker-details/locker-details.component';
import { LockerTypesComponent } from './locker-types/locker-types.component';
import { LockerTypesDetailsComponent } from './locker-types/locker-types-details/locker-types-details.component';
import { LockerTypesCreateComponent } from './locker-types/locker-types-create/locker-types-create.component';
import { FieldTypesDetailsComponent } from './field-types/field-types-details/field-types-details.component';
import { FieldTypesComponent } from './field-types/field-types.component';
import { FieldTypesCreateComponent } from './field-types/field-types-create/field-types-create.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsCreateComponent } from './fields/fields-create/fields-create.component';
import { FieldsDetailsComponent } from './fields/fields-details/fields-details.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {path: '', redirectTo: 'members', pathMatch:'full'},
  {path: 'members',component:MembersComponent},
  {path: 'members/create',component:MemberCreateComponent},
  {path: 'members/:memberId',component:MemberDetailsComponent},
  {path: 'students',component:StudentsComponent},
  {path: 'students/create',component:StudentCreateComponent},
  {path: 'students/:studentId',component:StudentDetailsComponent},
  {path: 'member-types',component:MemberTypesComponent},
  {path: 'member-types/create',component:MemberTypesCreateComponent},
  {path: 'member-types/:typeId',component:MemberTypesDetailsComponent},
  {path: 'membership-statuses',component:MembershipStatusComponent},
  {path: 'membership-statuses/create',component:MembershipStatusCreateComponent},
  {path: 'membership-statuses/:statusId',component:MembershipStatusDetailComponent},
  {path: 'payment-types',component:PaymentTypesComponent},
  {path: 'payment-types/create',component:PaymentTypesCreateComponent},
  {path: 'payment-types/:paymentTypeId',component:PaymentTypesDetailComponent},
  {path: 'student-types',component:StudentTypesComponent},
  {path: 'student-types/create',component:StudentTypeCreateComponent},
  {path: 'student-types/:typeId',component:StudentTypeDetailsComponent},
  {path: 'module-types',component:ModuleTypesComponent},
  {path: 'module-types/create',component:ModuleTypesCreateComponent},
  {path: 'module-types/:moduleTypeId',component:ModuleTypesDetailsComponent},
  {path: 'levels',component:LevelsComponent},
  {path: 'levels/create',component:LevelsCreateComponent},
  {path: 'levels/:levelId',component:LevelsDetailsComponent},
  {path: 'lockers',component:LockersComponent},
  {path: 'lockers/create',component:LockerCreateComponent},
  {path: 'lockers/:lockerId',component:LockerDetailsComponent},
  {path: 'locker-types',component:LockerTypesComponent},
  {path: 'locker-types/create',component:LockerTypesCreateComponent},
  {path: 'locker-types/:lockerTypeId',component:LockerTypesDetailsComponent},
  {path: 'fields',component:FieldsComponent},
  {path: 'fields/create',component:FieldsCreateComponent},
  {path: 'fields/:fieldId',component:FieldsDetailsComponent},
  {path: 'field-types',component:FieldTypesComponent},
  {path: 'field-types/create',component:FieldTypesCreateComponent},
  {path: 'field-types/:fieldTypeId',component:FieldTypesDetailsComponent},
  {path: 'general',component:GeneralComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules,
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
