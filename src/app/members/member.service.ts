import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { Member } from './member.model';

@Injectable()
export class MemberService{
    
    url = "http://localhost:8080/members";

    constructor(private http:HttpClient){}

    getMembers():Observable<Member[]>{

        return this.http.get<Member[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            catchError(this.handleError)
            ); 
        
    }

    getMemberById(memberId:string):Observable<Member>{
        return this.http.get<Member>(this.url+"/"+memberId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            delay(500)
            );
    }

    createMember(member:Member):Observable<Member>{
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        return this.http.post<Member>(this.url,member,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }


    





    private handleError(error:HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client ya da network tarafıyla alakalı bir hata ise
            console.log("Error: "+ error.error.message)
        }else{
            //backend kaynaklı hata
            switch(error.status){
                case 404:
                    console.log("not found");
                    break;
                case 403:
                    console.log("access denied");
                    break;
                case 500:
                    console.log("internal server");
                    break;
                default:
                    console.log("bilinmeyen hata");
                    
                }
        }
        return throwError("Bir Hata var");
    }
}