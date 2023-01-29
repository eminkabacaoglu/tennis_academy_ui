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
  providers:[MemberService],
})
export class MemberCreateComponent implements OnInit{
  
  
  modelBirthDate: NgbDateStruct| undefined;
  modelMembershipBegins: NgbDateStruct| undefined;
  modelMembershipEnds: NgbDateStruct| undefined;
  webRezervation:boolean=true;
	today = this.calendar.getToday();
  myData: any;


  constructor(private memberService:MemberService,private router:Router,private calendar: NgbCalendar){}


  
  ngOnInit(): void {
    
  }

  memberForm = new FormGroup({
    firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    job : new FormControl("",[Validators.required]),
    // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
  })
  createMember(){
    const member:any ={
      firstName:this.memberForm.value.firstName,
      lastName:this.memberForm.value.lastName,
      job:this.memberForm.value.job,
      webRezervation:this.webRezervation
    }

    // this.movieService.createMovie(movie).subscribe();
    this.memberService.createMember(member).subscribe(data=>{
        // this.router.navigate(["/movies"])
        this.router.navigate(["/members"])
      });
  }
}
