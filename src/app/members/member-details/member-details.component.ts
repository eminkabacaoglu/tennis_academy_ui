import { Member } from './../member.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  providers:[MemberService]
})
export class MemberDetailsComponent implements OnInit{

  member:Member;
  memberForm:FormGroup;
  dateOfBirth: NgbDateStruct| undefined;
  dateOfMembershipBegin: NgbDateStruct| undefined;
  dateOfMembershipEnd: NgbDateStruct| undefined;
  webRezervation:boolean=true;
	today = this.calendar.getToday();
  myData: any;

  constructor(private memberService:MemberService,private calendar: NgbCalendar,private router:Router,private activatedRoute:ActivatedRoute){
  
  }

  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.memberService.getMemberById(params["memberId"]).subscribe(data=>{
        if(data==null){
          this.router.navigate(["/members"])
        }
        this.member=data
      })
    })

    this.memberForm = new FormGroup({
      firstName : new FormControl(this.member.firstName,[Validators.required, Validators.minLength(3)]),
      lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      job : new FormControl("",[Validators.required]),
      // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
    })
    
  }

  


  updateMember(){
    const member:any ={
      firstName:this.memberForm.value.firstName,
      lastName:this.memberForm.value.lastName,
      job:this.memberForm.value.job,
    }

    this.memberService.updateMember(member).subscribe(data=>{
      // this.router.navigate(["/movies"])
      this.router.navigate(["/members"+"/"+data.id])
    });

  }
}
