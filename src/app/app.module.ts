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
