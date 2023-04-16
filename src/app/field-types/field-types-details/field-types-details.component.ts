import { Component, OnInit } from '@angular/core';
import { FieldTypesService } from '../field-types.service';
import { FieldType } from '../field-type.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-field-types-details',
  templateUrl: './field-types-details.component.html',
  styleUrls: ['./field-types-details.component.css'],
  providers:[FieldTypesService]
})
export class FieldTypesDetailsComponent implements OnInit{


  fieldType:FieldType
  fieldTypeUpdated:FieldType
  fieldTypeForm:FormGroup;
  constructor(private fieldTypesService:FieldTypesService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.fieldTypeForm = new FormGroup({
      fieldTypeCode : new FormControl("",[Validators.required]),
      fieldTypeDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.fieldTypesService.getFieldTypeById(params["fieldTypeId"]).subscribe(data=>{
        this.fieldType=data
        if(this.fieldType==null){
          this.router.navigate(["/field-types"])
        }
        console.log(this.fieldType)
        this.fieldTypeForm.patchValue({
          fieldTypeCode:this.fieldType.fieldTypeCode,
          fieldTypeDescription:this.fieldType.fieldTypeDescription,

        })
      
      })
    })  
  }


  updateFieldType(){
    
    if(this.fieldTypeForm.valid){
      this.fieldTypeUpdated=Object.assign({},this.fieldTypeForm.value)
      console.log(this.fieldTypeUpdated)
    }

    this.fieldTypesService.updateFieldType(this.fieldType.id,this.fieldTypeUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/field-types"+"/"+data.id])

    });
  }

  deleteFieldTypeDetail(){
    
    this.fieldTypesService.deleteLockerType(this.fieldType.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/field-types"])

    });
  }
}
