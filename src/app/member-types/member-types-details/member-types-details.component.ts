import { AlertifyService } from './../../shared/alertify.service';
import { ConfirmationDialogService } from './../../shared/confirmation-dialog/confirmation-dialog.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberTypeService } from './../member-type.service';
import { Component, OnInit } from '@angular/core';
import { param } from 'jquery';

@Component({
  selector: 'app-member-types-details',
  templateUrl: './member-types-details.component.html',
  styleUrls: ['./member-types-details.component.css'],
  providers:[MemberTypeService,ConfirmationDialogService]
})
export class MemberTypesDetailsComponent  implements OnInit{
  
  
  myData: any;
  memberType:any;
  memberTypeForm:FormGroup;

  constructor(private memberTypeService:MemberTypeService,private router:Router,private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private ConfirmationDialogService: ConfirmationDialogService, private alertify:AlertifyService){
    this.memberTypeForm = new FormGroup({
      typeCode : new FormControl("",[Validators.required, Validators.minLength(3)]),
      description : new FormControl("",[Validators.required, Validators.minLength(3)]),
      
      paymentType: new FormControl("",[]),
    })
  }


  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.memberTypeService.getMemberTypeById(params["typeId"]).subscribe(data=>{
        this.memberType=data
        if(this.memberType==null){
          this.router.navigate(["/member-types"])
        }
        console.log(this.memberType)
        this.memberTypeForm.patchValue({
          typeCode:this.memberType.typeCode,
          description:this.memberType.description,
          paymentType:this.memberType.paymentType,

        })
      
      })
    })
  }

  
  updateMemberType(){
    if(this.memberTypeForm.valid){
      this.memberType=Object.assign({},this.memberTypeForm.value)
    }

    this.memberTypeService.updateMemberType(this.memberType.id,this.memberType).subscribe(data=>{
        this.alertify.success("Güncellendi")
        this.router.navigate(["/member-types"+"/"+data.id])
      })
  }

  deleteMemberType(){
    this.memberTypeService.deleteMemberType(this.memberType.id).subscribe(data=>{
      this.router.navigate(["/member-types"])
      this.alertify.error("Silindi")
    });

  }


  public openConfirmationDialog() {
    this.ConfirmationDialogService.confirm('Lütfen Onaylayın...', 'Kaydı Silmek İStediğinize Emin Misiniz ??')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      this.deleteMemberType();
    }) 
    .catch(() => console.log('User dismissed the dialog'));
  }
}
