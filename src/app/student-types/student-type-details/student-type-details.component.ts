import { StudentTypeService } from './../student-type.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-type-details',
  templateUrl: './student-type-details.component.html',
  styleUrls: ['./student-type-details.component.css'],
  providers:[StudentTypeService]
})
export class StudentTypeDetailsComponent  implements OnInit{


  studenType:any
  studentTypeUpdated:any
  studentTypeForm:FormGroup;
  constructor(private studentTypeService:StudentTypeService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.studentTypeForm = new FormGroup({
      typeCode : new FormControl("",[Validators.required, Validators.minLength(3)]),
      description : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
      // paymentType: new FormControl("",[Validators.required]),
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.studentTypeService.getStudentTypeById(params["typeId"]).subscribe(data=>{
        this.studenType=data
        if(this.studenType==null){
          this.router.navigate(["/student-types"])
        }
        console.log(this.studenType)
        this.studentTypeForm.patchValue({
          typeCode:this.studenType.typeCode,
          description:this.studenType.description,

        })
      
      })
    })  
  }


  updateStudentType(){
    
    if(this.studentTypeForm.valid){
      this.studentTypeUpdated=Object.assign({},this.studentTypeForm.value)
      console.log(this.studentTypeUpdated)
    }

    this.studentTypeService.updateStudentType(this.studenType.id,this.studentTypeUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/student-types"+"/"+data.id])

    });
  }

  deleteStudentTypeDetail(){
    
    this.studentTypeService.deleteStudentType(this.studenType.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/student-types"])

    });
  }
}