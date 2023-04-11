import { Component, OnInit } from '@angular/core';
import { LockerTypeService } from '../locker-type.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LockerType } from '../locker-type.model';

@Component({
  selector: 'app-locker-types-details',
  templateUrl: './locker-types-details.component.html',
  styleUrls: ['./locker-types-details.component.css'],
  providers:[LockerTypeService]
})
export class LockerTypesDetailsComponent implements OnInit{


  lockerType:LockerType
  lockerTypeUpdated:LockerType
  lockerTypeForm:FormGroup;
  constructor(private lockerTypeService:LockerTypeService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.lockerTypeForm = new FormGroup({
      description : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.lockerTypeService.getLockerTypeById(params["lockerTypeId"]).subscribe(data=>{
        this.lockerType=data
        if(this.lockerType==null){
          this.router.navigate(["/locker-types"])
        }
        console.log(this.lockerType)
        this.lockerTypeForm.patchValue({
          description:this.lockerType.description,

        })
      
      })
    })  
  }


  updateLockerType(){
    
    if(this.lockerTypeForm.valid){
      this.lockerTypeUpdated=Object.assign({},this.lockerTypeForm.value)
      console.log(this.lockerTypeUpdated)
    }

    this.lockerTypeService.updateLockerType(this.lockerType.id,this.lockerTypeUpdated).subscribe(data=>{
      this.alertify.success("Güncellendi")
      this.router.navigate(["/locker-types"+"/"+data.id])

    });
  }

  deleteLockerTypeDetail(){
    
    this.lockerTypeService.deleteLockerType(this.lockerType.id).subscribe(data=>{
      this.alertify.error("Silindi")
      this.router.navigate(["/locker-types"])

    });
  }
}