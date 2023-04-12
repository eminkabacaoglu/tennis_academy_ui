import { Component, OnInit } from '@angular/core';
import { LockerService } from '../locker.service';
import { LockerTypeService } from 'src/app/locker-types/locker-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { Locker } from '../locker.model';
import { LockerType } from 'src/app/locker-types/locker-type.model';


@Component({
  selector: 'app-locker-details',
  templateUrl: './locker-details.component.html',
  styleUrls: ['./locker-details.component.css'],
  providers:[LockerService,LockerTypeService,ConfirmationDialogService]
})
export class LockerDetailsComponent implements OnInit{
  
  
  myData: any;
  locker:Locker;
  lockerTypes:LockerType[];
  lockerUpdated:Locker;
  lockerForm:FormGroup;

  constructor(private lockerService:LockerService,private lockerTypeService:LockerTypeService,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private ConfirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.lockerForm = new FormGroup({
      lockerCode : new FormControl("",[Validators.required, Validators.minLength(1)]),
      lockerType: new FormControl(null,[Validators.required]),
      duesFee : new FormControl(0,[Validators.required]),
      allocationFee : new FormControl(0,[Validators.required]),
    
    })
  }


  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.lockerService.getLockerById(params["lockerId"]).subscribe(data=>{
        this.locker=data
        if(this.locker==null){
          this.router.navigate(["/member-types"])
        }
        console.log(this.locker)
        this.lockerForm.patchValue({
          lockerCode:this.locker.lockerCode,
          duesFee:this.locker.duesFee,
          allocationFee:this.locker.allocationFee,
          lockerType:this.locker.lockerType,

        })
        
      })
    })

    this.lockerTypeService.getLockerTypes().subscribe(data=>{
      this.lockerTypes =data;
   })
   
  }
  lockerTypesComp(a: LockerType, b: LockerType): boolean {
    return a.id === b.id;
  }
  
  updateLocker(){
    if(this.lockerForm.valid){
      this.lockerUpdated=Object.assign({},this.lockerForm.value)
      
    }
    this.lockerService.updateLocker(this.locker.id,this.lockerUpdated).subscribe(data=>{
        this.alertify.success("Güncellendi")
        this.router.navigate(["/lockers"+"/"+data.id])
        
      })
  }

  deleteLocker(){
    this.lockerService.deleteLocker(this.locker.id).subscribe(data=>{
      this.router.navigate(["/lockers"])
      this.alertify.error("Silindi")
    });

  }


  public openConfirmationDialog() {
    this.ConfirmationDialogService.confirm('Lütfen Onaylayın...', 'Kaydı Silmek İStediğinize Emin Misiniz ??')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      this.deleteLocker();
    }) 
    .catch(() => console.log('User dismissed the dialog'));
  }
}

