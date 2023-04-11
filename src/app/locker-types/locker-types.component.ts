import { Component, OnInit } from '@angular/core';
import { LockerType } from './locker-type.model';
import { Subject } from 'rxjs';
import { LockerTypeService } from './locker-type.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locker-types',
  templateUrl: './locker-types.component.html',
  styleUrls: ['./locker-types.component.css'],
  providers:[LockerTypeService]
})
export class LockerTypesComponent implements OnInit{
  lockerTypes:LockerType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private lockerTypeService:LockerTypeService, private activatedRoute:ActivatedRoute){}
  
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
    this.lockerTypeService.getLockerTypes().subscribe(data=>{
      this.lockerTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}

