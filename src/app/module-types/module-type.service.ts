import { ModuleType } from './module-type.model';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ModuleTypeService {

  url = "http://localhost:8080/moduletypes";

  constructor(private http:HttpClient) { }

    getModuleTypes():Observable<ModuleType[]>{

        return this.http.get<ModuleType[]>(this.url).pipe(
            map(response=>{
                return response
            }),
            // delay(250), 
            catchError(this.handleError)
            );
    }

    getModuleTypeById(moduleTypeId:number):Observable<ModuleType>{
        return this.http.get<ModuleType>(this.url+"/"+moduleTypeId).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError),
            // delay(500)
            );
    }

    createModuleType(moduleType:ModuleType):Observable<ModuleType>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }
        return this.http.post<ModuleType>(this.url,moduleType,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
            catchError(this.handleError)
            );
    }

    updateModuleType(id:number,moduleType:ModuleType):Observable<ModuleType>{
    
        const httpOptions= {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Autohorization':'Token'
            }),
        }

        return this.http.put<ModuleType>(this.url+"/"+id,moduleType,httpOptions).pipe(
            tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
            catchError(this.handleError),
            );
            
    }

    deleteModuleType(id:number):Observable<boolean>{
    
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
