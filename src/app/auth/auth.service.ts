import { enviroment } from './../environments/environment';
import { Router } from '@angular/router';
import { User } from './user.model';
import { catchError, Subject, throwError, tap, BehaviorSubject } from 'rxjs';
import { AuthResponse } from './auth-response.model'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn:'root'
})
export class AuthService {

  // api_key="AIzaSyA0IEDNJJ7B_v7dqa94tTAXpcMo-Yv3UtE" //api_key degişkeine enviremonet içine alıyoruz li development ve production ordamları için farklılık göstermesi durumunda tek yerden yönetebilelim
  // url_signUp= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.api_key;
  // url_signIn="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.api_key;
  url_signUp= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+enviroment.api_key;
  url_signIn="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+enviroment.api_key;
  
  user = new  BehaviorSubject<User>(null);
  
  constructor(private http:HttpClient, private router:Router) { }

  signUp(userEmail:string,userPassword:string){
    return this.http.post<AuthResponse>(this.url_signUp,{
      email:userEmail,
      password:userPassword,
      returnSecureToken:true
    }).pipe(tap(response=>{
      this.handleAuthentication(response.email,response.localId,response.idToken,Number(response.expiresIn))

    }));
  }

  login(userEmail:string,userPassword:string){
    return this.http.post<AuthResponse>(this.url_signIn,{
      email:userEmail,
      password:userPassword,
      returnSecureToken:true

    }).pipe(tap(response=>{
      this.handleAuthentication(response.email,response.localId,response.idToken,Number(response.expiresIn))

    }));
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(["/auth"]);
  }

  autoLogin(){
    const user =JSON.parse(localStorage.getItem("user"));
    if(!user){
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    )

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
    const user = new User(
      email,
      userId, 
      token,
      expirationDate);
    
    this.user.next(user);
    localStorage.setItem("user",JSON.stringify(user))
  }

}
