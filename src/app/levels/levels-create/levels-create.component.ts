import { ModuleTypeService } from './../../module-types/module-type.service';
import { LevelService } from './../level.service';
import { ModuleType } from './../../module-types/module-type.model';
import { Component, OnInit } from '@angular/core';
import { Level } from '../level.model';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-levels-create',
  templateUrl: './levels-create.component.html',
  styleUrls: ['./levels-create.component.css'],
  providers:[LevelService,ModuleTypeService]
})
export class LevelsCreateComponent implements OnInit{
  
  myData: any;
  level:Level;
  moduleTypes:ModuleType[];
  moduleType:ModuleType;

  

  constructor(private levelService:LevelService,private router:Router,private alertify:AlertifyService,private moduleTypeService:ModuleTypeService){}


  
  ngOnInit(): void {
    this.moduleTypeService.getModuleTypes().subscribe(data=>{
      this.moduleTypes =data;
   })
    
  }

  levelForm = new FormGroup({
    levelCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
    levelDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
    quota : new FormControl(0,[Validators.required]),
    
    selecetModuleType: new UntypedFormControl("",[Validators.required]),
  })

  createLevel(){


    if(this.levelForm.valid){
      this.level=<Level><unknown>Object.assign({}, this.levelForm.value)
      this.moduleTypeService.getModuleTypeById(this.levelForm.value.selecetModuleType)
        .subscribe(data=>{
          this.moduleType= data
          this.level.moduleType=data
          this.levelService.createLevel(this.level).subscribe(data=>{
            this.alertify.success("Kaydedildi")
            this.router.navigate(["/levels"+"/"+data.id])

          });
        })
        
    }
    
    // this.levelService.createLevel(this.level).subscribe(data=>{
    //     this.alertify.success("Kaydedildi")
    //     this.router.navigate(["/levels"+"/"+data.id])

    //   });
  }
}
