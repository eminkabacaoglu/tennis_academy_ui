import { Component, OnInit } from '@angular/core';
import { FieldService } from '../field.service';
import { FieldTypesService } from 'src/app/field-types/field-types.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from '../field.model';
import { FieldType } from 'src/app/field-types/field-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-fields-details',
  templateUrl: './fields-details.component.html',
  styleUrls: ['./fields-details.component.css'],
  providers:[FieldService,FieldTypesService,ConfirmationDialogService]
})
export class FieldsDetailsComponent implements OnInit{
  
  
  myData: any;
  field:Field;
  fieldTypes:FieldType[];
  fieldUpdated:Field;
  fieldForm:FormGroup;

  constructor(private fieldService:FieldService,private fieldTypesService:FieldTypesService,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private ConfirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.fieldForm = new FormGroup({
      fieldCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
      fieldName : new FormControl("",[Validators.required, Validators.minLength(1)]),
      fieldDescription : new FormControl(),
      fieldType: new FormControl(null,[Validators.required]),
      active : new FormControl(),
      webActive : new FormControl(),
    
    })
  }


  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.fieldService.getFieldById(params["fieldId"]).subscribe(data=>{
        this.field=data
        if(this.field==null){
          this.router.navigate(["/fields"])
        }
        console.log(this.field)
        this.fieldForm.patchValue({
          fieldCode:this.field.fieldCode,
          fieldName:this.field.fieldName,
          fieldDescription:this.field.fieldDescription,
          active:this.field.active,
          webActive:this.field.webActive,
          fieldType:this.field.fieldType,

        })
        
      })
    })

    this.fieldTypesService.getFieldTypes().subscribe(data=>{
      this.fieldTypes =data;
   })
   
  }
  fieldTypesComp(a: FieldType, b: FieldType): boolean {
    return a.id === b.id;
  }
  
  updateField(){
    if(this.fieldForm.valid){
      this.fieldUpdated=Object.assign({},this.fieldForm.value)
      
    }
    this.fieldService.updateField(this.field.id,this.fieldUpdated).subscribe(data=>{
        this.alertify.success("Güncellendi")
        this.router.navigate(["/fields"+"/"+data.id])
        
      })
  }

  deleteField(){
    this.fieldService.deleteField(this.field.id).subscribe(data=>{
      this.router.navigate(["/fields"])
      this.alertify.error("Silindi")
    });

  }


  public openConfirmationDialog() {
    this.ConfirmationDialogService.confirm('Lütfen Onaylayın...', 'Kaydı Silmek İStediğinize Emin Misiniz ??')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      this.deleteField();
    }) 
    .catch(() => console.log('User dismissed the dialog'));
  }
}

