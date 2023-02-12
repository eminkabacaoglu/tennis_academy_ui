import { Subject } from 'rxjs/internal/Subject';
import { MemberType } from './member-type.model';
import { ActivatedRoute } from '@angular/router';
import { MemberTypeService } from './member-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-types',
  templateUrl: './member-types.component.html',
  styleUrls: ['./member-types.component.css'],
  providers:[MemberTypeService],
})
export class MemberTypesComponent implements OnInit{
  memberTypes:MemberType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private memberTypeService:MemberTypeService, private activatedRoute:ActivatedRoute){}
  
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
    this.memberTypeService.getMemberTypes().subscribe(data=>{
      this.memberTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}
