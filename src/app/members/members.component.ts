import { Member } from './member.model';
import { MemberService } from './member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers:[MemberService],
})

export class MembersComponent implements OnInit{

  members:Member[]=[];
  activeMembers:Member[]=[];
  passiveMembers:Member[]=[];
  apiError:any;
  displayPassives:boolean=false;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private memberService:MemberService, private activatedRoute:ActivatedRoute){}
  
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
    this.memberService.getMembers().subscribe(data=>{
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

