import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { MemberType } from './member-type.model';

@Injectable()
export class MemberTypeService {

  

  url = "http://localhost:8080/membertypes";

  constructor(private http:HttpClient) { }

    getMemberTypes():Observable<MemberType[]>{

        return this.http.get<MemberType[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getMemberTypeById(typeId:number):Observable<MemberType>{
        return this.http.get<MemberType>(this.url+"/"+typeId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            // delay(500)
            );
    }

    createMemberType(memberType:MemberType):Observable<MemberType>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        return this.http.post<MemberType>(this.url,memberType,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }

    updateMemberType(id:number,memberType:MemberType):Observable<MemberType>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }

        return this.http.put<MemberType>(this.url+"/"+id,memberType,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
            catchError(this.handleError),
            );
            
    }

    deleteMemberType(id:number):Observable<boolean>{
    
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
