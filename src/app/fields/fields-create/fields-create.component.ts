import { Component, OnInit } from '@angular/core';
import { FieldService } from '../field.service';
import { FieldTypesService } from 'src/app/field-types/field-types.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Field } from '../field.model';
import { FieldType } from 'src/app/field-types/field-type.model';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fields-create',
  templateUrl: './fields-create.component.html',
  styleUrls: ['./fields-create.component.css'],
  providers:[FieldService,FieldTypesService]
})
export class FieldsCreateComponent implements OnInit{
  
  myData: any;
  field:Field;
  fieldTypes:FieldType[];
  fieldType:FieldType;

  

  constructor(private fieldService:FieldService,private fieldTypesService:FieldTypesService,private router:Router,private alertify:AlertifyService){}


  
  ngOnInit(): void {
    this.fieldTypesService.getFieldTypes().subscribe(data=>{
      this.fieldTypes =data;
   })
    
  }

  fieldForm = new FormGroup({
    fieldCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
    fieldName : new FormControl("",[Validators.required, Validators.minLength(1)]),
    fieldDescription : new FormControl(),    
    fieldType: new UntypedFormControl("",[Validators.required]),
  })

  createField(){
    if(this.fieldForm.valid){
      this.field=<Field><unknown>Object.assign({}, this.fieldForm.value)
      this.fieldTypesService.getFieldTypeById(this.fieldForm.value.fieldType)
        .subscribe(data=>{
          this.field.fieldType=data
          this.fieldService.createField(this.field).subscribe(data=>{
            this.alertify.success("Kaydedildi")
            this.router.navigate(["/fields"+"/"+data.id])

          });
        })
        
    }
    
    // this.levelService.createLevel(this.level).subscribe(data=>{
    //     this.alertify.success("Kaydedildi")
    //     this.router.navigate(["/levels"+"/"+data.id])

    //   });
  }
}
