import { StudentService } from '../student.service';
import { CityService } from 'src/app/cities/city.service';
import { City } from './../../cities/city.model';
import { th } from 'date-fns/locale';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student.model';
import { StudentType } from 'src/app/student-types/student-type.model';
import { StudentTypeService } from 'src/app/student-types/student-type.service';
import { ModuleTypeService } from 'src/app/module-types/module-type.service';
import { Level } from 'src/app/levels/level.model';
import { LevelService } from 'src/app/levels/level.service';


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  providers:[StudentService,CityService,StudentTypeService,LevelService],
})
export class StudentCreateComponent implements OnInit{


  dateOfBirth: Date| undefined;
  dateOfRegisteration: Date| undefined;
	today = this.calendar.getToday();
  myData: any;
  student:Student;
  cities:City[];
  studentTypes:StudentType[];
  levels:Level[];


  constructor(private studentService:StudentService,private studentTypeService:StudentTypeService,private levelService:LevelService,private router:Router,private calendar: NgbCalendar, private alertify:AlertifyService,private cityService:CityService){
    this.ngOnInit()
  }


  ngOnInit(): void {
     this.studentTypeService.getStudentTypes().subscribe(data=>{
        this.studentTypes =data;
     })
     this.levelService.getLevels().subscribe(data=>{
      this.levels =data;
   })
   this.cityService.getCities().subscribe(data=>{
    this.cities =data;
 })

  }

  studentForm = new FormGroup({
    firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
    nationalId: new FormControl(""),
    school : new FormControl(""),
    parentNameSurname : new FormControl(""),
    parentJob : new FormControl(""),
    parentWorkPlace : new FormControl(""),
    alternativeParent : new FormControl(""),
    placeOfBirth : new FormControl(""),
    fatherName : new FormControl(""),
    motherName : new FormControl(""),
    level : new FormControl(),
    city : new FormControl(),
    studentType : new FormControl(),
    attendanceType: new FormControl(),
    email : new FormControl(),
    mobilePhone : new FormControl(),
    homePhone : new FormControl(),
    gender:new FormControl(),
    note : new FormControl(""),
    dateOfRegisteration:new FormControl(),
    dateOfBirth:new FormControl(),


    // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
  })

  setDate(date:NgbDateStruct){

    console.log(date)
    const dt =date
    const jsDate = new Date(dt.year, dt.month-1, dt.day+1);
    // return jsDate.toISOString().slice(0, 10).toString();
    return jsDate
  }
  createStudent(){
    // this.member={
    //   firstName:this.memberForm.value.firstName,
    //   lastName:this.memberForm.value.lastName,
    //   job:this.memberForm.value.job,
    //   nationalId:this.memberForm.value.nationalId,

    // }
    if(this.studentForm.valid){
      this.student=Object.assign({},this.studentForm.value)
      this.student.dateOfRegisteration=this.setDate(this.studentForm.value.dateOfRegisteration)
      this.student.dateOfBirth=this.setDate(this.studentForm.value.dateOfBirth)

      console.log(this.student.dateOfBirth)
    }

    this.studentService.createStudent(this.student).subscribe(data=>{
        this.alertify.success("Kaydedildi")
        this.router.navigate(["/students"+"/"+data.id])
      });
  }
}

