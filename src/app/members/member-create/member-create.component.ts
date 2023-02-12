import { MemberType } from './../../member-types/member-type.model';
import { MemberTypeService } from './../../member-types/member-type.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Member } from './../member.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers:[MemberService,MemberTypeService],
})
export class MemberCreateComponent implements OnInit{
  
  
  dateOfBirth: NgbDateStruct| undefined;
  dateOfMembershipBegin: NgbDateStruct| undefined;
  dateOfMembershipEnd: NgbDateStruct| undefined;
  webRezervation:boolean=true;
	today = this.calendar.getToday();
  myData: any;
  member:any;
  memberTypes:MemberType[];

  constructor(private memberService:MemberService,private memberTypeService:MemberTypeService,private router:Router,private calendar: NgbCalendar, private alertify:AlertifyService){}


  
  ngOnInit(): void {
     this.memberTypeService.getMemberTypes().subscribe(data=>{
        this.memberTypes =data;
     })
  }

  memberForm = new FormGroup({
    firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
    nationalId: new FormControl("",[Validators.required]),
    job : new FormControl("",[Validators.required]),
    // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
  })
  createMember(){
    // this.member={
    //   firstName:this.memberForm.value.firstName,
    //   lastName:this.memberForm.value.lastName,
    //   job:this.memberForm.value.job,
    //   nationalId:this.memberForm.value.nationalId,

    // }
    if(this.memberForm.valid){
      this.member=Object.assign({},this.memberForm.value)
    }

    this.memberService.createMember(this.member).subscribe(data=>{
        this.alertify.success("Kaydedildi")
        this.router.navigate(["/members"+"/"+data.id])
      });
  }
}
