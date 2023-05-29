import { Locker } from './../../lockers/locker.model';
import { MemberType } from './../../member-types/member-type.model';
import { MembershipStatusService } from './../../membership-status/membership-status.service';
import { MembershipStatus } from './../../membership-status/membership-status.model';
import { ConfirmationDialogService } from './../../shared/confirmation-dialog/confirmation-dialog.service';
import { Member } from './../member.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { MemberTypeService } from 'src/app/member-types/member-type.service';
import { City } from 'src/app/cities/city.model';
import { CityService } from 'src/app/cities/city.service';
import { LockerService } from 'src/app/lockers/locker.service';
import { th } from 'date-fns/locale';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';    

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  providers:[MemberService,ConfirmationDialogService,MemberTypeService,MembershipStatusService,CityService,LockerService]
})

export class MemberDetailsComponent implements OnInit{

  member:Member;
  memberUpdated:Member;
  memberForm:FormGroup;
  dateOfBirth: Date| undefined;
  dateOfMembershipBegin: Date| undefined;
  dateOfMembershipEnd: Date| undefined;
	today = this.calendar.getToday();
  myData: any;
  memberTypes:MemberType[];
  cities:City[];
  membershipStatuses:MembershipStatus[];
  formatteStringdDate:string;
  stringifiedData:JSON;
  lockers:Locker[];
  selectedLocker:Locker;
  getMemberLocker:Locker;
  getMemberLockerCode:string;

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  constructor(private memberService:MemberService,private lockerService:LockerService,private cityService:CityService,private memberTypeService:MemberTypeService,private membershipStatusService:MembershipStatusService,private calendar: NgbCalendar,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private confirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.memberForm = new FormGroup({
      firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      job : new FormControl(),
      username : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required]),
      nationalId : new FormControl(),
      placeOfBirth : new FormControl(),
      fatherName : new FormControl(),
      motherName : new FormControl(),
      mobilePhone : new FormControl(),
      homePhone : new FormControl(),
      city : new FormControl(),
      email : new FormControl(),
      memberType: new FormControl(null,[Validators.required]),
      membershipStatus: new FormControl(null,[Validators.required]),
      active:new FormControl(),
      webReservation:new FormControl(),
      dateOfMembershipBegin:new FormControl(),
      dateOfMembershipEnd:new FormControl(),
      dateOfBirth:new FormControl(),
      gender:new FormControl([Validators.required]),
      note:new FormControl(),
      // selectedLocker:new FormControl(),

    })

    
    
  }
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      this.memberService.getMemberById(params["memberId"]).subscribe(data=>{
        
        
        if(data==null){
          this.router.navigate(["/members"])
        }
        

        this.memberTypeService.getMemberTypes().subscribe(data=>{
          this.memberTypes =data;
        })
        this.membershipStatusService.getMembershipStatuses().subscribe(data=>{
        this.membershipStatuses =data;
        })

        this.cityService.getCities().subscribe(data=>{
          this.cities =data;
       })


        this.lockerService.getLockersMemberNull().subscribe(data=>{
          this.lockers =data;
       })


        this.member=data
        this.memberForm.patchValue({
          firstName:this.member.firstName,
          lastName:this.member.lastName,
          job:this.member.job,
          username:this.member.username,
          password:this.member.password,
          gender:this.member.gender,
          nationalId:this.member.nationalId,
          placeOfBirth:this.member.placeOfBirth,
          fatherName:this.member.fatherName,
          city:this.member.city,
          motherName:this.member.motherName,
          mobilePhone:this.member.mobilePhone,
          homePhone:this.member.homePhone,
          email:this.member.email,
          memberType:this.member.memberType,
          membershipStatus:this.member.membershipStatus,
          active:this.member.active,
          webReservation:this.member.webReservation,
          dateOfMembershipBegin:new Date(this.member.dateOfMembershipBegin),
          dateOfMembershipEnd:new Date(this.member.dateOfMembershipEnd),
          dateOfBirth:new Date(this.member.dateOfBirth),
          note:this.member.note,
        
        })
        
        this.memberForm.controls["dateOfMembershipBegin"].setValue(this.setNg(new Date(this.member.dateOfMembershipBegin)))
        this.memberForm.controls["dateOfMembershipEnd"].setValue(this.setNg(new Date(this.member.dateOfMembershipEnd)))
        this.memberForm.controls["dateOfBirth"].setValue(this.setNg(new Date(this.member.dateOfBirth)))
        // console.log(this.memberForm.value.dateOfMembershipBegin)
        // console.log(this.member.dateOfMembershipBegin)
    
        this.lockerService.getLockerMemberByMemberId(this.member.id).subscribe(data=>{
          if(data!=null){
            this.getMemberLocker =data;
            this.getMemberLockerCode =this.getMemberLocker.lockerCode;
          } 
          
       })
      })
      
      
    })
    
  }

  membershipStatus(a: MembershipStatus, b: MembershipStatus): boolean {
    return a.id === b.id;
    
  }
  
  memberType(a: MemberType, b: MemberType): boolean {
    return a.id === b.id;
  }


  cty(a: City, b: City): boolean {
    return a.id === b.id;
  }

  setNg(date:Date){
    return {
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate()
    }
  }

  setDate(date:NgbDateStruct){
  
    console.log(date)
    const dt =date 
    const jsDate = new Date(dt.year, dt.month-1, dt.day+1);
    return jsDate
  }


  updateMember(){

    console.log(this.memberForm.valid)
    console.log(this.memberForm)
    console.log(this.memberForm.get("dateOfMembershipBegin"))
    console.log(this.memberForm.get("dateOfMembershipEnd"))
    
    if(this.memberForm.valid){
      console.log("asdasd")
      console.log(this.memberForm.value.dateOfMembershipBegin)
      console.log(this.memberForm.value.dateOfMembershipEnd)
      this.memberUpdated=Object.assign({},this.memberForm.value)
      this.memberUpdated.dateOfMembershipBegin=this.setDate(this.memberForm.value.dateOfMembershipBegin)
      this.memberUpdated.dateOfMembershipEnd=this.setDate(this.memberForm.value.dateOfMembershipEnd)
      this.memberUpdated.dateOfBirth=this.setDate(this.memberForm.value.dateOfBirth)
    }

    console.log("getttttt: "+this.memberForm.value.dateOfMembershipBegin)
    console.log("getttttt2: "+ this.memberForm.value.firstName)
    console.log("getttttt2: "+ this.memberForm.value.city)


      
      this.memberService.updateMember(this.member.id,this.memberUpdated).subscribe(data=>{
      // window.location.reload();
      this.alertify.success("Güncellendi")
      setTimeout(function() {
        window.location.reload();
      }, 300); 
    });

  }

  deleteMember(){
    this.memberService.deleteMember(this.member.id).subscribe(data=>{
      this.router.navigate(["/members"])
      this.alertify.error("Silindi")
    });

  }
  addLocker(){
    
    this.lockerService.getLockerById(this.selectedLocker.id).subscribe(data=>{
        var locker=data
        if(locker.member!=null){
          
          this.alertify.error("Dolap üyeye atanmış")
          setTimeout(function() {
            window.location.reload();
          }, 300); 
          this.closePopup();
        }
        else{
          this.selectedLocker.member=this.member;
        this.lockerService.updateLocker(this.selectedLocker.id,this.selectedLocker).subscribe(data=>{
          this.alertify.success("Eklendi")
          setTimeout(function() {
            window.location.reload();
            
          }, 300); 
          this.closePopup();
        });
        }
        
        })
    
  }

  deleteMemberLocker(){
    this.getMemberLocker.member=null;
    this.lockerService.updateLocker(this.getMemberLocker.id,this.getMemberLocker).subscribe(data=>{
      this.alertify.success("Dolap Silindi")
      window.location.reload();
    });
  }


  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Lütfen Onaylayın...', 'Kaydı Silmek İStediğinize Emin Misiniz ??')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      this.deleteMember();
    }) 
    .catch(() => console.log('User dismissed the dialog'));
  }

}
