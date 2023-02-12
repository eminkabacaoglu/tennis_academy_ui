import { ConfirmationDialogService } from './../../shared/confirmation-dialog/confirmation-dialog.service';
import { Member } from './../member.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  providers:[MemberService,ConfirmationDialogService]
})
export class MemberDetailsComponent implements OnInit{

  member:Member;
  memberUpdated:Member;
  memberForm:FormGroup;
  dateOfBirth: NgbDateStruct| undefined;
  dateOfMembershipBegin: NgbDateStruct| undefined;
  dateOfMembershipEnd: NgbDateStruct| undefined;
  webRezervation:boolean=true;
	today = this.calendar.getToday();
  myData: any;

  constructor(private memberService:MemberService,private calendar: NgbCalendar,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private confirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.memberForm = new FormGroup({
      firstName : new FormControl([Validators.required, Validators.minLength(3)]),
      lastName : new FormControl([Validators.required]),
      job : new FormControl([Validators.required]),
      username : new FormControl([Validators.required]),
      password : new FormControl([Validators.required]),
      nationalId : new FormControl()
    })
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.memberService.getMemberById(params["memberId"]).subscribe(data=>{
        this.member=data
        if(this.member==null){
          this.router.navigate(["/members"])
        }
        console.log(this.member)
        this.memberForm.patchValue({
          firstName:this.member.firstName,
          lastName:this.member.lastName,
          job:this.member.job,
          username:this.member.username,
          password:this.member.password,
          nationalId:this.member.nationalId,
        })
      
      })
    })

    

  }


  updateMember(){

    if(this.memberForm.valid){
      this.memberUpdated=Object.assign({},this.memberForm.value)
    }

    console.log(this.member.id)
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
