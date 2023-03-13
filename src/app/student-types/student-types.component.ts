import { StudentType } from './student-type.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentTypeService } from './student-type.service';

@Component({
  selector: 'app-student-types',
  templateUrl: './student-types.component.html',
  styleUrls: ['./student-types.component.css'],
  providers:[StudentTypeService],
})
export class StudentTypesComponent implements OnInit{
  studentTypes:StudentType[]=[];
  apiError:any;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private studentTypeService:StudentTypeService, private activatedRoute:ActivatedRoute){}
  
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
    this.studentTypeService.getStudentTypes().subscribe(data=>{
      this.studentTypes = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
  }
}