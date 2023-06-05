import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { Member } from './member.model';

@Injectable()
export class MemberService{
    
    url = "http://localhost:8080/members";

    constructor(private http:HttpClient){}

    getMembers():Observable<Member[]>{
        // if(!isActive){
        //     this.url+="/passive"
        // }
        // else{
        //     this.url+="/active"
        // }

        return this.http.get<Member[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getMemberById(memberId:number):Observable<Member>{
        return this.http.get<Member>(this.url+"/"+memberId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            // delay(500)
            );
    }

    getActiveMembers():Observable<Member[]>{
        return this.http.get<Member[]>(this.url+"/active").pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getPassiveMembers():Observable<Member[]>{
        return this.http.get<Member[]>(this.url+"/passive").pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    createMember(member:Member):Observable<Member>{
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        console.log(member)
        return this.http.post<Member>(this.url,member,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }

    updateMember(id:number,member:Member):Observable<Member>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        // member= JSON.parse(JSON.stringify(member));
        // 
        return this.http.put<Member>(this.url+"/"+id,member,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
            catchError(this.handleError),
            );
            
    }

    deleteMember(id:number):Observable<boolean>{
    
        return this.http.delete<boolean>(this.url+"/"+id).pipe(
            tap(data=>console.log("Sonuç: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
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
        return throwError("Bir Hata var: ");
    }
}