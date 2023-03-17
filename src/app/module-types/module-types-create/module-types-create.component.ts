import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ModuleTypeService } from '../module-type.service';

@Component({
  selector: 'app-module-types-create',
  templateUrl: './module-types-create.component.html',
  styleUrls: ['./module-types-create.component.css'],
  providers:[ModuleTypeService]
})
export class ModuleTypesCreateComponent {


  moduleType:any

  constructor(private moduleTypeService:ModuleTypeService, private alertify:AlertifyService,private router:Router){}

  moduleTypeForm = new FormGroup({
    moduleDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
    // paymentType: new FormControl("",[Validators.required]),
  })

  createModuleType(){
    
    if(this.moduleTypeForm.valid){
      this.moduleType=Object.assign({},this.moduleTypeForm.value)
    }

    this.moduleTypeService.createModuleType(this.moduleType).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/module-types"+"/"+data.id])

    });
  }

}
