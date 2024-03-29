import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './shared/error.inteceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { StudentsComponent } from './students/students.component';
import { EmployeesComponent } from './employees/employees.component';
import { MemberTypesComponent } from './member-types/member-types.component';
import { EmployeeTypesComponent } from './employee-types/employee-types.component';
import { MemberTypesCreateComponent } from './member-types/member-types-create/member-types-create.component';
import { MemberTypesDetailsComponent } from './member-types/member-types-details/member-types-details.component';
import { MembershipStatusComponent } from './membership-status/membership-status.component';
import { MembershipStatusCreateComponent } from './membership-status/membership-status-create/membership-status-create.component';
import { MembershipStatusDetailComponent } from './membership-status/membership-status-detail/membership-status-detail.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { PaymentTypesCreateComponent } from './payment-types/payment-types-create/payment-types-create.component';
import { PaymentTypesDetailComponent } from './payment-types/payment-types-detail/payment-types-detail.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { CountiesComponent } from './counties/counties.component';
import { StudentTypesComponent } from './student-types/student-types.component';
import { StudentTypeCreateComponent } from './student-types/student-type-create/student-type-create.component';
import { StudentTypeDetailsComponent } from './student-types/student-type-details/student-type-details.component';
import { LevelsComponent } from './levels/levels.component';
import { ModuleTypesComponent } from './module-types/module-types.component';
import { ModuleTypesCreateComponent } from './module-types/module-types-create/module-types-create.component';
import { ModuleTypesDetailsComponent } from './module-types/module-types-details/module-types-details.component';
import { LevelsCreateComponent } from './levels/levels-create/levels-create.component';
import { LevelsDetailsComponent } from './levels/levels-details/levels-details.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { LockersComponent } from './lockers/lockers.component';
import { LockerCreateComponent } from './lockers/locker-create/locker-create.component';
import { LockerDetailsComponent } from './lockers/locker-details/locker-details.component';
import { LockerTypesComponent } from './locker-types/locker-types.component';
import { LockerTypesCreateComponent } from './locker-types/locker-types-create/locker-types-create.component';
import { LockerTypesDetailsComponent } from './locker-types/locker-types-details/locker-types-details.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsCreateComponent } from './fields/fields-create/fields-create.component';
import { FieldsDetailsComponent } from './fields/fields-details/fields-details.component';
import { FieldTypesComponent } from './field-types/field-types.component';
import { FieldTypesCreateComponent } from './field-types/field-types-create/field-types-create.component';
import { FieldTypesDetailsComponent } from './field-types/field-types-details/field-types-details.component';
import { GeneralComponent } from './general/general.component';
import { ReservationSettingsComponent } from './reservation-settings/reservation-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MembersComponent,
    MemberDetailsComponent,
    FooterComponent,
    MemberCreateComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    StudentsComponent,
    EmployeesComponent,
    MemberTypesComponent,
    StudentTypesComponent,
    EmployeeTypesComponent,
    MemberTypesCreateComponent,
    MemberTypesDetailsComponent,
    MembershipStatusComponent,
    MembershipStatusCreateComponent,
    MembershipStatusDetailComponent,
    PaymentTypesComponent,
    PaymentTypesCreateComponent,
    PaymentTypesDetailComponent,
    CitiesComponent,
    CountriesComponent,
    CountiesComponent,
    StudentTypeCreateComponent,
    StudentTypeDetailsComponent,
    LevelsComponent,
    ModuleTypesComponent,
    ModuleTypesCreateComponent,
    ModuleTypesDetailsComponent,
    LevelsCreateComponent,
    LevelsDetailsComponent,
    StudentCreateComponent,
    StudentDetailsComponent,
    LockersComponent,
    LockerCreateComponent,
    LockerDetailsComponent,
    LockerTypesComponent,
    LockerTypesCreateComponent,
    LockerTypesDetailsComponent,
    FieldsComponent,
    FieldsCreateComponent,
    FieldsDetailsComponent,
    FieldTypesComponent,
    FieldTypesCreateComponent,
    FieldTypesDetailsComponent,
    GeneralComponent,
    ReservationSettingsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,

    

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
