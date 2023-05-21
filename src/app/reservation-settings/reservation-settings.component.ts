import { Component, OnInit } from '@angular/core';
import { ReservationSetting } from './reservation-setting.model';
import { AlertifyService } from '../shared/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationSettingService } from './reservation-setting.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reservation-settings',
  templateUrl: './reservation-settings.component.html',
  styleUrls: ['./reservation-settings.component.css'],
  providers:[ReservationSettingService]
})
export class ReservationSettingsComponent implements OnInit{


  reservationSetting:ReservationSetting
  reservationSettingUpdated:ReservationSetting
  reservationSettingForm:FormGroup;
  constructor(private reservationSettingService:ReservationSettingService, private alertify:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute){
    this.reservationSettingForm = new FormGroup({
      maxNumberOfDaysOwed : new FormControl("",[Validators.required,]),
      playerWaitingMinute : new FormControl("",[Validators.required]),
      reservationBeginningTime : new FormControl("",[Validators.required]),
      reservationEndingTime : new FormControl("",[Validators.required]),
      reservationForwardDay : new FormControl("",[Validators.required]),
      reservationForwardDayForTrainers : new FormControl("",[Validators.required]),
      reservationCancellationPeriod : new FormControl("",[Validators.required]),
      reservationCancellationPeriodTrainers : new FormControl("",[Validators.required]),
      reservationPeriod : new FormControl("",[Validators.required]),
      webReservationBeginningTime : new FormControl("",[Validators.required]),
      webReservationEndingTime : new FormControl("",[Validators.required]),
      minTimePeriod : new FormControl("",[Validators.required]),
      maxReservationHour : new FormControl("",[Validators.required]),
      maxReservationHourInPrimeTime : new FormControl("",[Validators.required]),
      
    })
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.reservationSettingService.getReservationSetting().subscribe(data=>{
        this.reservationSetting=data
        if(this.reservationSetting==null){
          this.router.navigate(["/reservation-settings"])
        }
        console.log(this.reservationSetting)
        this.reservationSettingForm.patchValue({
          maxNumberOfDaysOwed : this.reservationSetting.maxNumberOfDaysOwed,
          playerWaitingMinute : this.reservationSetting.playerWaitingMinute,
          reservationBeginningTime : this.reservationSetting.reservationBeginningTime,
          reservationEndingTime : this.reservationSetting.reservationEndingTime,
          reservationForwardDay : this.reservationSetting.reservationForwardDay,
          reservationForwardDayForTrainers : this.reservationSetting.reservationForwardDayForTrainers,
          reservationCancellationPeriod : this.reservationSetting.reservationCancellationPeriod,
          reservationCancellationPeriodTrainers : this.reservationSetting.reservationCancellationPeriodTrainers,
          reservationPeriod : this.reservationSetting.reservationPeriod,
          webReservationBeginningTime : this.reservationSetting.webReservationBeginningTime,
          webReservationEndingTime : this.reservationSetting.webReservationEndingTime,
          minTimePeriod : this.reservationSetting.minTimePeriod,
          maxReservationHour : this.reservationSetting.maxReservationHour,
          maxReservationHourInPrimeTime :this.reservationSetting.maxReservationHourInPrimeTime,

        })
      
      })
    })  
  }


  updateReservationSetting(){
    
    if(this.reservationSettingForm.valid){
      this.reservationSettingUpdated=Object.assign({},this.reservationSettingForm.value)
      console.log(this.reservationSettingUpdated)
    }

    this.reservationSettingService.updateReservationSetting(this.reservationSettingUpdated).subscribe(data=>{  
      this.alertify.success("Güncellendi")
      // this.router.navigate(["/reservation-settings"])
      setTimeout(() => {
        window.location.reload();
      }, 400);

    });
  }
 saveReservationSetting(){
    
    if(this.reservationSettingForm.valid){
      this.reservationSettingUpdated=Object.assign({},this.reservationSettingForm.value)
      console.log(this.reservationSettingUpdated)
    }

    this.reservationSettingService.createReservationSetting(this.reservationSettingUpdated).subscribe(data=>{
      this.alertify.success("Kaydedildi")
      setTimeout(() => {
        window.location.reload();
      }, 400);
      // this.router.navigate(["/reservation-settings"])

    });
  }

}