import { MembershipStatus } from './../membership-status.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../shared/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MembershipStatusService } from './../membership-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-status-create',
  templateUrl: './membership-status-create.component.html',
  styleUrls: ['./membership-status-create.component.css'],
  providers:[MembershipStatusService]
})
export class MembershipStatusCreateComponent {
  myData: any;
  membershipStatus:any;

  constructor(private membershipStatusService:MembershipStatusService,private router:Router,private alertify:AlertifyService){}


  membershipStatusForm = new FormGroup({
    statusName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
  })

  createMembershipStatus(){
    
    if(this.membershipStatusForm.valid){
      this.membershipStatus=Object.assign({},this.membershipStatusForm.value)
    }

    this.membershipStatusService.createMembershipStatus(this.membershipStatus).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/membership-statuses"+"/"+data.id])

    });
  }

}
