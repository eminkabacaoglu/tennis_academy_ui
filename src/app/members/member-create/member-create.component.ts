import { City } from './../../cities/city.model';
import { CityService } from './../../cities/city.service';
import { MembershipStatusService } from './../../membership-status/membership-status.service';
import { MembershipStatus } from './../../membership-status/membership-status.model';
import { MemberType } from './../../member-types/member-type.model';
import { MemberTypeService } from './../../member-types/member-type.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Member } from './../member.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers:[MemberService,MemberTypeService,MembershipStatusService,CityService],
})
export class MemberCreateComponent implements OnInit{


  dateOfBirth: Date| undefined;
  dateOfMembershipBegin: Date| undefined;
  dateOfMembershipEnd: Date| undefined;
	today = this.calendar.getToday();
  myData: any;
  member:Member;
  memberTypes:MemberType[];
  membershipStatuses:MembershipStatus[];
  cities:City[];
  


  constructor(private memberService:MemberService,private memberTypeService:MemberTypeService,private membershipStatusService:MembershipStatusService,private router:Router,private calendar: NgbCalendar, private alertify:AlertifyService,private cityService:CityService){
    this.ngOnInit()
  }


  ngOnInit(): void {
     this.memberTypeService.getMemberTypes().subscribe(data=>{
        this.memberTypes =data;
     })
     this.membershipStatusService.getMembershipStatuses().subscribe(data=>{
      this.membershipStatuses =data;
   })
   this.cityService.getCities().subscribe(data=>{
    this.cities =data;
 })

  }

  memberForm = new FormGroup({
    firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    nationalId: new FormControl(),
    job : new FormControl(),
    placeOfBirth : new FormControl(),
    fatherName : new FormControl(),
    motherName : new FormControl(),
    membershipStatus : new FormControl(null,[Validators.required]),
    city : new FormControl(),
    memberType : new FormControl(null,[Validators.required]),
    email : new FormControl(),
    mobilePhone : new FormControl(),
    homePhone : new FormControl(),
    gender:new FormControl(),
    note : new FormControl(),
    dateOfMembershipBegin:new FormControl(),
    dateOfMembershipEnd:new FormControl(),
    dateOfBirth:new FormControl(),


    // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
  })

  setDate(date:NgbDateStruct){

    console.log(date)
    const dt =date
    const jsDate = new Date(dt.year, dt.month-1, dt.day+1);
    // return jsDate.toISOString().slice(0, 10).toString();
    return jsDate
  }
  createMember(){
    // this.member={
    //   firstName:this.memberForm.value.firstName,
    //   lastName:this.memberForm.value.lastName,
    //   job:this.memberForm.value.job,
    //   nationalId:this.memberForm.value.nationalId,

    // }

    if(this.memberForm.valid){
      this.member=Object.assign({},this.memberForm.value)
      this.member.referenceMember=null;
      this.member.dateOfMembershipBegin=this.setDate(this.memberForm.value.dateOfMembershipBegin)
      this.member.dateOfMembershipEnd=this.setDate(this.memberForm.value.dateOfMembershipEnd)
      this.member.dateOfBirth=this.setDate(this.memberForm.value.dateOfBirth)

      console.log(this.member.dateOfBirth)
    }

    this.memberService.createMember(this.member).subscribe(data=>{
      
        this.alertify.success("Kaydedildi")
        this.router.navigate(["/members"+"/"+data.id])
      });
  }
}
