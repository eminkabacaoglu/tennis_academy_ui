import { LockerType } from '../locker-type.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LockerTypeService } from '../locker-type.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-locker-types-create',
  templateUrl: './locker-types-create.component.html',
  styleUrls: ['./locker-types-create.component.css'],
  providers:[LockerTypeService]
})

export class LockerTypesCreateComponent{
  
  myData: any;
  lockerType:LockerType;

  constructor(private lockerTypeService:LockerTypeService, private alertify:AlertifyService,private router:Router){}

  lockerTypeForm = new FormGroup({
    description : new FormControl("",[Validators.required, Validators.minLength(3)]),
    
  })

  createLockerType(){
    
    if(this.lockerTypeForm.valid){
      this.lockerType=Object.assign(this.lockerTypeForm.value)
    }

    this.lockerTypeService.createLockerType(this.lockerType).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      this.router.navigate(["/locker-types"+"/"+data.id])

    });
  }

}
