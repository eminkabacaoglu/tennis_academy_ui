import { th } from 'date-fns/locale';
import { MemberType } from './../../member-types/member-type.model';
import { MembershipStatusService } from './../../membership-status/membership-status.service';
import { MembershipStatus } from './../../membership-status/membership-status.model';
import { ConfirmationDialogService } from './../../shared/confirmation-dialog/confirmation-dialog.service';
import { Member } from './../member.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { MemberTypeService } from 'src/app/member-types/member-type.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  providers:[MemberService,ConfirmationDialogService,MemberTypeService,MembershipStatusService]
})
export class MemberDetailsComponent implements OnInit{

  member:Member;
  memberUpdated:Member;
  memberForm:FormGroup;
  dateOfBirth: NgbDateStruct| undefined;
  dateOfMembershipBegin: Date| undefined;
  // dateOfMembershipBegin: NgbDateStruct| undefined={ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  dateOfMembershipEnd: NgbDateStruct| undefined;
	today = this.calendar.getToday();
  myData: any;
  memberTypes:MemberType[];
  membershipStatuses:MembershipStatus[];
  formatteStringdDate:string;
  stringifiedData:JSON;
  constructor(private memberService:MemberService,private memberTypeService:MemberTypeService,private membershipStatusService:MembershipStatusService,private calendar: NgbCalendar,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private confirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    
    this.memberForm = new FormGroup({
      firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      job : new FormControl(),
      username : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required]),
      nationalId : new FormControl(),
      placeOfBirth : new FormControl(),
      memberType: new FormControl(null,[Validators.required]),
      membershipStatus: new FormControl(null,[Validators.required]),
      active:new FormControl(),
      webReservation:new FormControl(),
      dateOfMembershipBegin:new FormControl(),
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

        this.member=data
        this.memberForm.patchValue({
          firstName:this.member.firstName,
          lastName:this.member.lastName,
          job:this.member.job,
          username:this.member.username,
          password:this.member.password,
          nationalId:this.member.nationalId,
          placeOfBirth:this.member.placeOfBirth,
          memberType:this.member.memberType,
          membershipStatus:this.member.membershipStatus,
          active:this.member.active,
          webReservation:this.member.webReservation,
          dateOfMembershipBegin:new Date(this.member.dateOfMembershipBegin),
          
        
        })
        // this.memberForm.controls["dateOfMembershipBegin"].setValue({ year: this.member.dateOfMembershipBegin.getFullYear(), month: (this.member.dateOfMembershipBegin.getMonth()+1), day: this.member.dateOfMembershipBegin.getDay() })
        this.memberForm.controls["dateOfMembershipBegin"].setValue(this.setNg(new Date(this.member.dateOfMembershipBegin)))
        console.log(this.memberForm.value.dateOfMembershipBegin)
        console.log(this.member.dateOfMembershipBegin)
    
      })
      
      
    })
    
  }

  membershipStatus(a: MembershipStatus, b: MembershipStatus): boolean {
    return a.id === b.id;
    
  }
  
  memberType(a: MemberType, b: MemberType): boolean {
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
  
    // const year = this.memberForm.value.dateOfMembershipBegin.year;
    // const month:string = this.memberForm.value.dateOfMembershipBegin.month.toString().padStart(2, '0');
    // const day:string = this.memberForm.value.dateOfMembershipBegin.day.toString().padStart(2, '0');

    // this.formatteStringdDate = `${year}-${month}-${day}`;
    // this.dateOfMembershipBegin=new Date(this.formatteStringdDate);
    // console.log(this.formatteStringdDate)

    console.log(this.memberForm.value.dateOfMembershipBegin)
    const dt =this.memberForm.value.dateOfMembershipBegin 
    const jsDate = new Date(dt.year, dt.month-1, dt.day+1);
    // this.memberForm.value.dateOfMembershipBegin=jsDate
    // this.dateOfMembershipBegin=jsDate
    console.log("trr:"+jsDate) 
    return jsDate
  }

  // setDateAsString(date:Date){
  
  //   const year = date.getFullYear();
  //   const month:string = (date.getMonth()+1).toString().padStart(2, '0');
  //   const day:string = date.getDay().toString().padStart(2, '0');

  //   this.formatteStringdDate = `${year}-${month}-${day}`;
  //   return this.formatteStringdDate
  // }

  updateMember(){
    
    console.log(this.memberForm.valid)

    console.log(this.memberForm.get("dateOfMembershipBegin"))
    
    if(this.memberForm.valid){
      console.log("asdasd")
      console.log(this.memberForm.value.dateOfMembershipBegin)
      this.memberUpdated=Object.assign({},this.memberForm.value)
      this.memberUpdated.dateOfMembershipBegin=this.setDate(this.memberForm.value.dateOfMembershipBegin)
    }
    //this.memberUpdated=Object.assign({},this.memberForm.value)
    console.log("getttttt: "+this.memberForm.value.dateOfMembershipBegin)
    console.log("getttttt2: "+ this.memberForm.value.firstName)


      console.log(this.memberUpdated.dateOfMembershipBegin); // Output: e.g. 2023-02-21
      // this.memberUpdated.dateOfMembershipBegin=this.setDateAsString(this.memberForm.value.dateOfMembershipBegin)
      
      this.memberService.updateMember(this.member.id,this.memberUpdated).subscribe(data=>{
      // window.location.reload();
      this.alertify.success("Güncellendi")
      this.router.navigate(["/members"+"/"+this.member.id])
    });

  }

  deleteMember(){
    this.memberService.deleteMember(this.member.id).subscribe(data=>{
      this.router.navigate(["/members"])
      this.alertify.error("Silindi")
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
