import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CityService } from 'src/app/cities/city.service';
import { StudentTypeService } from 'src/app/student-types/student-type.service';
import { LevelService } from 'src/app/levels/level.service';
import { Student } from '../student.model';
import { City } from 'src/app/cities/city.model';
import { StudentType } from 'src/app/student-types/student-type.model';
import { Level } from 'src/app/levels/level.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers:[StudentService,CityService,StudentTypeService,LevelService],
})
export class StudentDetailsComponent implements OnInit{


  dateOfBirth: Date| undefined;
  dateOfRegistration: Date| undefined;
	today = this.calendar.getToday();
  myData: any;
  student:Student;
  studentUpdated:Student;
  studentForm:FormGroup;
  cities:City[];
  studentTypes:StudentType[];
  levels:Level[];

  constructor(private studentService:StudentService,private studentTypeService:StudentTypeService,private levelService:LevelService,private router:Router,private calendar: NgbCalendar, private alertify:AlertifyService,private cityService:CityService, private activatedRoute:ActivatedRoute,){
    this.studentForm = new FormGroup({
      firstName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      lastName : new FormControl("",[Validators.required, Validators.minLength(3)]),
      nationalId: new FormControl(),
      school : new FormControl(),
      parentNameSurname : new FormControl(),
      parentJob : new FormControl(),
      parentWorkPlace : new FormControl(),
      alternativeParent : new FormControl(),
      placeOfBirth : new FormControl(),
      fatherName : new FormControl(),
      motherName : new FormControl(),
      level : new FormControl(),
      city : new FormControl(),
      studentType : new FormControl(),
      attendanceType: new FormControl(),
      email : new FormControl(),
      mobilePhone : new FormControl(),
      homePhone : new FormControl(),
      gender:new FormControl(),
      dateOfRegistration:new FormControl(),
      dateOfBirth:new FormControl(),
      active:new FormControl(),
      webReservation:new FormControl(),
      inBlacklist:new FormControl(),
      blackListDescription:new FormControl(),
  
  
      // job : new FormControl("",[Validators.required,ImageValidator.isValidExtension]),
    })
  }


  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      this.studentService.getStudentById(params["studentId"]).subscribe(data=>{
        
        
        if(data==null){
          this.router.navigate(["/students"])
        }
        

        this.studentTypeService.getStudentTypes().subscribe(data=>{
          this.studentTypes =data;
       })
       this.levelService.getLevels().subscribe(data=>{
        this.levels =data;
     })
     this.cityService.getCities().subscribe(data=>{
      this.cities =data;
   })

        this.student=data
        this.studentForm.patchValue({
          firstName:this.student.firstName,
          lastName:this.student.lastName,
          school:this.student.school,
          username:this.student.username,
          password:this.student.password,
          gender:this.student.gender,
          nationalId:this.student.nationalId,
          placeOfBirth:this.student.placeOfBirth,
          fatherName:this.student.fatherName,
          city:this.student.city,
          motherName:this.student.motherName,
          parentNameSurname:this.student.parentNameSurname,
          parentJob:this.student.parentJob,
          parentWorkPlace:this.student.parentWorkPlace,
          alternativeParent:this.student.alternativeParent,
          mobilePhone:this.student.mobilePhone,
          homePhone:this.student.homePhone,
          email:this.student.email,
          level:this.student.level,
          attendanceType:this.student.attendanceType,
          studentType:this.student.studentType,
          active:this.student.active,
          webReservation:this.student.webReservation,
          inBlacklist:this.student.inBlacklist,
          blackListDescription:this.student.blackListDescription,
          dateOfRegistration:new Date(this.student.dateOfRegistration),
          dateOfBirth:new Date(this.student.dateOfBirth)
        })
        
        this.studentForm.controls["dateOfRegistration"].setValue(this.setNg(new Date(this.student.dateOfRegistration)))
        this.studentForm.controls["dateOfBirth"].setValue(this.setNg(new Date(this.student.dateOfBirth)))
        // console.log(this.memberForm.value.dateOfMembershipBegin)
        // console.log(this.member.dateOfMembershipBegin)
    
      })
      
      
    })

  }
  setNg(date:Date){
    return {
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate()
    }
  }


  stType(a: StudentType, b: StudentType): boolean {
    return a.id === b.id;
  }

  lvl(a: Level, b: Level): boolean {
    return a.id === b.id;
  }


  cty(a: City, b: City): boolean {
    return a.id === b.id;
  }
  setDate(date:NgbDateStruct){

    console.log(date)
    const dt =date
    const jsDate = new Date(dt.year, dt.month-1, dt.day+1);
    // return jsDate.toISOString().slice(0, 10).toString();
    return jsDate
  }
  updateStudent(){
    // this.member={
    //   firstName:this.memberForm.value.firstName,
    //   lastName:this.memberForm.value.lastName,
    //   job:this.memberForm.value.job,
    //   nationalId:this.memberForm.value.nationalId,

    // }
    if(this.studentForm.valid){

      this.studentUpdated=Object.assign({},this.studentForm.value)
      this.studentUpdated.dateOfRegistration=this.setDate(this.studentForm.value.dateOfRegistration)
      this.studentUpdated.dateOfBirth=this.setDate(this.studentForm.value.dateOfBirth)

    
    }

    this.studentService.updateStudent(this.student.id,this.studentUpdated).subscribe(data=>{
        this.alertify.success("Güncellendi")
        this.router.navigate(["/students"+"/"+data.id])
      });
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.student.id).subscribe(data=>{
      this.router.navigate(["/students"])
      this.alertify.error("Silindi")
    });

  }
}

