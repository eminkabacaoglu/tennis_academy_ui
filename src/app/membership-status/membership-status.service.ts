import { MembershipStatus } from './membership-status.model';
import { throwError, map } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MembershipStatusService {

    url = "http://localhost:8080/membershipstatuses";

    constructor(private http:HttpClient) { }

    getMembershipStatuses():Observable<MembershipStatus[]>{

        return this.http.get<MembershipStatus[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getMembershipStatusById(statusId:number):Observable<MembershipStatus>{
        return this.http.get<MembershipStatus>(this.url+"/"+statusId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            // delay(500)
            );
    }

    createMembershipStatus(membershipStatus:MembershipStatus):Observable<MembershipStatus>{

        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        return this.http.post<MembershipStatus>(this.url,membershipStatus,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }

    updateMembershipStatus(id:number,membershipStatus:MembershipStatus):Observable<MembershipStatus>{

        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }

        return this.http.put<MembershipStatus>(this.url+"/"+id,membershipStatus,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
            catchError(this.handleError),
            );

    }

    deleteMembershipStatus(id:number):Observable<boolean>{

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
