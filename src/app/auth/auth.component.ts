import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from './auth-response.model';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  isLoginMode:boolean = true
  loading:boolean = false
  error:string
  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
      
  }

  changeLoginMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }else{
      const email=form.value.email;
      const password=form.value.password;
      this.loading = true;

      let authResponse:Observable<AuthResponse>;

      if( this.isLoginMode ){
        
        authResponse = this.authService.login(email,password)

      }else{
        
        authResponse = this.authService.signUp(email,password)
      }

      authResponse.subscribe(response => {
        console.log(response)
        this.loading = false;
        this.router.navigate(["/movies"]);
      },err=>{
        
        this.error = err; 
        console.log(err)
        this.loading = false;
      })

      form.reset();
      
    }
  }

  // closeDialog(){
  //   this.error=null;
  // }

  // alt komponentten deger donerse
  closeDialog($event:any){
    this.error=null;
  }

}
