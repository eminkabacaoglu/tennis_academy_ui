import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ModuleTypeService } from '../module-type.service';

@Component({
  selector: 'app-module-types-details',
  templateUrl: './module-types-details.component.html',
  styleUrls: ['./module-types-details.component.css'],
  providers:[ModuleTypeService]
})
export class ModuleTypesDetailsComponent implements OnInit{


  moduleType:any
  moduleTypeUpdated:any
  moduleTypeForm:FormGroup;
  constructor(private moduleTypeService:ModuleTypeService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.moduleTypeForm = new FormGroup({
      moduleDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
      // paymentType: new FormControl("",[Validators.required]),
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.moduleTypeService.getModuleTypeById(params["moduleTypeId"]).subscribe(data=>{
        this.moduleType=data
        if(this.moduleType==null){
          this.router.navigate(["/module-types"])
        }
        console.log(this.moduleType)
        this.moduleTypeForm.patchValue({
          moduleDescription:this.moduleType.moduleDescription,

        })
      
      })
    })  
  }


  updateModuleType(){
    
    if(this.moduleTypeForm.valid){
      this.moduleTypeUpdated=Object.assign({},this.moduleTypeForm.value)
      console.log(this.moduleTypeUpdated)
    }

    this.moduleTypeService.updateModuleType(this.moduleType.id,this.moduleTypeUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/module-types"+"/"+data.id])

    });
  }

  deleteModuleDetail(){
    
    this.moduleTypeService.deleteModuleType(this.moduleType.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/module-types"])

    });
  }
}