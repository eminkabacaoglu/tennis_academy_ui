import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../shared/alertify.service';
import { MembershipStatusService } from './../membership-status.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembershipStatus } from './../membership-status.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-status-detail',
  templateUrl: './membership-status-detail.component.html',
  styleUrls: ['./membership-status-detail.component.css'],
  providers:[MembershipStatusService]
})
export class MembershipStatusDetailComponent implements OnInit{


  membershipStatus:any
  membershipStatusUpdated:any
  membershipStatusForm:FormGroup;

  constructor(private membershipStatusService:MembershipStatusService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.membershipStatusForm = new FormGroup({
      statusName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      

    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.membershipStatusService.getMembershipStatusById(params["statusId"]).subscribe(data=>{
        this.membershipStatus=data
        if(this.membershipStatus==null){
          this.router.navigate(["/membership-statuses"])
        }
        console.log(this.membershipStatus)
        this.membershipStatusForm.patchValue({
          statusName:this.membershipStatus.statusName,

        })
      
      })
    })  
  }


  updateMembershipStatus(){
    
    if(this.membershipStatusForm.valid){
      this.membershipStatusUpdated=Object.assign({},this.membershipStatusForm.value)
      console.log(this.membershipStatusUpdated)
    }

    this.membershipStatusService.updateMembershipStatus(this.membershipStatus.id,this.membershipStatusUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/membership-statuses"+"/"+data.id])

    });
  }

  deleteMembershipStatus(){
    
    this.membershipStatusService.deleteMembershipStatus(this.membershipStatus.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/membership-statuses"])

    });
  }
}
