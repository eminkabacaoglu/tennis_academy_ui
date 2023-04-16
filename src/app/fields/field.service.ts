import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { Field } from './field.model';

@Injectable()
export class FieldService {

  url = "http://localhost:8080/fields";

  constructor(private http:HttpClient) { }

    getFields():Observable<Field[]>{

        return this.http.get<Field[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getFieldById(typeId:number):Observable<Field>{
        return this.http.get<Field>(this.url+"/"+typeId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            // delay(500)
            );
    }

    createField(field:Field):Observable<Field>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        return this.http.post<Field>(this.url,field,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }

    updateField(id:number,field:Field):Observable<Field>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }

        return this.http.put<Field>(this.url+"/"+id,field,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
            catchError(this.handleError),
            );
            
    }

    deleteField(id:number):Observable<boolean>{
    
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
