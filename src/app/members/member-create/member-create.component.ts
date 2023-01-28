import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers:[MemberService],
})
export class MemberCreateComponent implements OnInit{
  
  constructor(private memberService:MemberService,private router:Router,){}
  
  ngOnInit(): void {
    
  }

  createMovie(){

  }
}
