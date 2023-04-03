import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs';
import { StudentService } from './student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers:[StudentService],
})
export class StudentsComponent implements OnInit,OnDestroy{

  students:Student[]=[];
  activeMembers:Student[]=[];
  passiveMembers:Student[]=[];
  apiError:any;
  displayPassives:boolean=false;
  dtOption:DataTables.Settings={};
  dtTrigger:Subject<any> = new Subject<any>();
  memberTable: any;

  constructor(private studentService:StudentService, private activatedRoute:ActivatedRoute){}
  
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
    this.studentService.getStudents().subscribe(data=>{
      this.students = data;
      this.dtTrigger.next(null);
      
    },error=>{
      this.apiError = error;

    });
    
  }


  ngOnDestroy(): void {
    // this.memberTable.destroy();
  }

  // activeOrPassive(){
  //   if(this.displayPassives){
  //     this.dtTrigger.unsubscribe();
  //     this.getPassiveMembers()
  //   }
  //   else{
  //     this.dtTrigger.unsubscribe();
  //     this.getActiveMembers()
  //   }
  // }

  // getActiveMembers(){
  //   this.studentService.getActiveMembers().subscribe(data=>{
  //     this.students = data;
  //     this.dtTrigger.next(null);
  //   },error=>{
  //     this.apiError = error;

  //   });
  // }

  

  // getStudents(){
  //   if(this.displayPassives){
      
  //     return this.students.filter(data=>data.active===false)

  //   }
  //   else{
      
  //     return this.students.filter(data=>data.active===true)
  
  //   }
  // }
  
  
}
