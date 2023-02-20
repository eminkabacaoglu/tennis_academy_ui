import { MembershipStatus } from './membership-status.model';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MembershipStatusService } from './membership-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-status',
  templateUrl: './membership-status.component.html',
  styleUrls: ['./membership-status.component.css'],
  providers:[MembershipStatusService]
})
export class MembershipStatusComponent implements OnInit{
  membershipStatuses:MembershipStatus[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();
  constructor(private membershipStatusService:MembershipStatusService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.dtOption={
      pagingType:"full_numbers",
      search:true,
      lengthChange:true,
      paging:true,

    }
    this.loadData();

  }

  loadData(){
    this.membershipStatusService.getMembershipStatuses().subscribe(data=>{
      this.membershipStatuses = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }

}
