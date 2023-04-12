import { Component, OnInit } from '@angular/core';
import { LockerService } from '../locker.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { LockerTypeService } from 'src/app/locker-types/locker-type.service';
import { LockerType } from 'src/app/locker-types/locker-type.model';
import { Locker } from '../locker.model';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-locker-create',
  templateUrl: './locker-create.component.html',
  styleUrls: ['./locker-create.component.css'],
  providers:[LockerService,LockerTypeService]
})
export class LockerCreateComponent implements OnInit{
  
  myData: any;
  locker:Locker;
  lockerTypes:LockerType[];
  lockerType:LockerType;

  

  constructor(private lockerService:LockerService,private router:Router,private alertify:AlertifyService,private lockerTypeService:LockerTypeService){}


  
  ngOnInit(): void {
    this.lockerTypeService.getLockerTypes().subscribe(data=>{
      this.lockerTypes =data;
   })
    
  }

  lockerForm = new FormGroup({
    lockerCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
    duesFee : new FormControl(0,[Validators.required]),
    allocationFee : new FormControl(0,[Validators.required]),
    
    selecetLockerType: new UntypedFormControl("",[Validators.required]),
  })

  createLocker(){


    if(this.lockerForm.valid){
      this.locker=<Locker><unknown>Object.assign({}, this.lockerForm.value)
      this.lockerTypeService.getLockerTypeById(this.lockerForm.value.selecetLockerType)
        .subscribe(data=>{
          this.lockerType= data
          this.locker.lockerType=data
          this.lockerService.createLocker(this.locker).subscribe(data=>{
            this.alertify.success("Kaydedildi")
            this.router.navigate(["/lockers"+"/"+data.id])

          });
        })
        
    }
    
    // this.levelService.createLevel(this.level).subscribe(data=>{
    //     this.alertify.success("Kaydedildi")
    //     this.router.navigate(["/levels"+"/"+data.id])

    //   });
  }
}
