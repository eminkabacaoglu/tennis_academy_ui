import { Member } from './member.model';
import { MemberService } from './member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers:[MemberService],
})

export class MembersComponent implements OnInit{

  members:Member[]=[];
  apiError:any;
  displayPassives:boolean=false;
  constructor(private memberService:MemberService, private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    
    this.memberService.getMembers().subscribe(data=>{
      this.members = data
      
      setTimeout(()=>{                          
        $('#datatable1').DataTable({
          retrieve: true,
          paging: true,
          lengthChange: true,
          searching: true,
          ordering: true,
          info: true,
          autoWidth: false,
          responsive: true,
      });
    

      }, 1);
    },error=>{
      this.apiError = error;

    });

    
    
  }

  getMembers(){
    if(this.displayPassives){
      return this.members.filter(data=>data.active==false)
    }
    else{
      return this.members.filter(data=>data.active==true)
    }
  }
  
  
}

