import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { StudentType } from '../student-type.model';
import { StudentTypeService } from '../student-type.service';

@Component({
  selector: 'app-student-type-create',
  templateUrl: './student-type-create.component.html',
  styleUrls: ['./student-type-create.component.css'],
  providers:[StudentTypeService]
})
export class StudentTypeCreateComponent implements OnInit{
  
  myData: any;
  studentType:any;
 
  constructor(private studentTypeService:StudentTypeService,private router:Router,private alertify:AlertifyService){}


  
  ngOnInit(): void {

    
  }

  studentTypeForm = new FormGroup({
    typeCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
    description : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
  })

  createStudentType(){


    if(this.studentTypeForm.valid){
      this.studentType=Object.assign({},this.studentTypeForm.value)
    }

    this.studentTypeService.createStudentType(this.studentType).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/student-types"+"/"+data.id])

    });
  }
}