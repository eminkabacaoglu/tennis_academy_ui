import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Locker } from './locker.model';
import { LockerService } from './locker.service';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css'],
  providers:[LockerService]
})
export class LockersComponent implements OnInit{
  lockers:Locker[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private lockerService:LockerService, private activatedRoute:ActivatedRoute){}
  
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
    this.lockerService.getLockers().subscribe(data=>{
      this.lockers = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}
