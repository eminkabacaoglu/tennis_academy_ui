import { ModuleType } from './../../module-types/module-type.model';
import { Level } from './../level.model';
import { ModuleTypeService } from './../../module-types/module-type.service';
import { LevelService } from './../level.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-levels-details',
  templateUrl: './levels-details.component.html',
  styleUrls: ['./levels-details.component.css'],
  providers:[LevelService,ModuleTypeService,ConfirmationDialogService]
})
export class LevelsDetailsComponent implements OnInit{
  
  
  myData: any;
  level:Level;
  moduleTypes:ModuleType[];
  levelUpdated:Level;
  levelForm:FormGroup;

  constructor(private levelService:LevelService,private moduleTypeService:ModuleTypeService,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private ConfirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.levelForm = new FormGroup({
      levelCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
      levelDescription : new FormControl("",[Validators.required, Validators.minLength(3)]),
      quota : new FormControl("",[Validators.required]),
      
      moduleType: new FormControl(null,[Validators.required]),
    })
  }


  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.levelService.getLevelById(params["levelId"]).subscribe(data=>{
        this.level=data
        if(this.level==null){
          this.router.navigate(["/member-types"])
        }
        console.log(this.level)
        this.levelForm.patchValue({
          levelCode:this.level.levelCode,
          levelDescription:this.level.levelDescription,
          quota:this.level.quota,
          moduleType:this.level.moduleType,

        })
        
      })
    })

    this.moduleTypeService.getModuleTypes().subscribe(data=>{
      this.moduleTypes =data;
   })
   
  }
  moduleTypesComp(a: ModuleType, b: ModuleType): boolean {
    return a.id === b.id;
  }
  
  updateLevel(){
    if(this.levelForm.valid){
      this.levelUpdated=Object.assign({},this.levelForm.value)
      
    }
    this.levelService.updateLevel(this.level.id,this.levelUpdated).subscribe(data=>{
        this.alertify.success("Güncellendi")
        this.router.navigate(["/levels"+"/"+data.id])
        
      })
  }

  deleteLevel(){
    this.levelService.deleteLevel(this.level.id).subscribe(data=>{
      this.router.navigate(["/levels"])
      this.alertify.error("Silindi")
    });

  }


  public openConfirmationDialog() {
    this.ConfirmationDialogService.confirm('Lütfen Onaylayın...', 'Kaydı Silmek İStediğinize Emin Misiniz ??')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      this.deleteLevel();
    }) 
    .catch(() => console.log('User dismissed the dialog'));
  }
}

