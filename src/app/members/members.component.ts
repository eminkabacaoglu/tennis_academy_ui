import { DataTablesModule } from 'angular-datatables';
import { Member } from './member.model';
import { MemberService } from './member.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers:[MemberService],
})

export class MembersComponent implements OnInit,OnDestroy{

  members:Member[]=[];
  activeMembers:Member[]=[];
  passiveMembers:Member[]=[];
  apiError:any;
  displayPassives:boolean=false;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();
  memberTable: any;

  constructor(private memberService:MemberService, private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.dtOption={
      pagingType:"full_numbers",
      search:true,
      lengthChange:true,
      paging:true,
      pageLength:5,
      lengthMenu:[5,10,15]

    }

    this.loadData();

  }

  loadData(){
    this.memberService.getActiveMembers().subscribe(data=>{
      this.members = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
    
  }


  ngOnDestroy(): void {
    // this.memberTable.destroy();
  }

  activeOrPassive(){
    if(this.displayPassives){
      this.dtTrigger.unsubscribe();
      this.getPassiveMembers()
    }
    else{
      this.dtTrigger.unsubscribe();
      this.getActiveMembers()
    }
  }

  getActiveMembers(){
    this.memberService.getActiveMembers().subscribe(data=>{
      this.members = data;
      this.dtTrigger.next(null);
    },error=>{
      this.apiError = error;

    });
  }

  getPassiveMembers(){
    this.memberService.getPassiveMembers().subscribe(data=>{
      this.members = data;
      this.dtTrigger.next(null);
    },error=>{
      this.apiError = error;

    });
  }

  

  getMembers(){
    if(this.displayPassives){
      
      return this.members.filter(data=>data.active===false)

    }
    else{
      
      return this.members.filter(data=>data.active===true)
  
    }
  }
  
  
}

