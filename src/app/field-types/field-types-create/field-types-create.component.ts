import { Component } from '@angular/core';
import { FieldTypesService } from '../field-types.service';
import { FieldType } from '../field-type.model';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-types-create',
  templateUrl: './field-types-create.component.html',
  styleUrls: ['./field-types-create.component.css'],
  providers:[FieldTypesService]
})
export class FieldTypesCreateComponent {
  
  myData: any;
  fieldType:FieldType;

  constructor(private fieldTypesService:FieldTypesService, private alertify:AlertifyService,private router:Router){}

  fieldTypeForm = new FormGroup({
    fieldTypeCode : new FormControl("",[Validators.required]),
    fieldTypeDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
  })

  createFieldType(){
    
    if(this.fieldTypeForm.valid){
      this.fieldType=Object.assign(this.fieldTypeForm.value)
    }

    this.fieldTypesService.createFieldType(this.fieldType).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/field-types"+"/"+data.id])

    });
  }

}

