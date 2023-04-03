import { Student } from './student.model';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
@Injectable()
export class StudentService{
    
  url = "http://localhost:8080/students";

  constructor(private http:HttpClient){}

  getStudents():Observable<Student[]>{
      // if(!isActive){
      //     this.url+="/passive"
      // }
      // else{
      //     this.url+="/active"
      // }

      return this.http.get<Student[]>(this.url).pipe(
          map(response=>{
              return response
          }),
          // delay(250), 
          catchError(this.handleError)
          );
  }

  getStudentById(studentId:number):Observable<Student>{
      return this.http.get<Student>(this.url+"/"+studentId).pipe(
          tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
          catchError(this.handleError),
          // delay(500)
          );
  }

  // getActiveMembers():Observable<Student[]>{
  //     return this.http.get<Student[]>(this.url+"/active").pipe(
  //         map(response=>{
  //             return response
  //         }),
  //         // delay(250), 
  //         catchError(this.handleError)
  //         );
  // }

  // getPassiveMembers():Observable<Student[]>{
  //     return this.http.get<Student[]>(this.url+"/passive").pipe(
  //         map(response=>{
  //             return response
  //         }),
  //         // delay(250), 
  //         catchError(this.handleError)
  //         );
  // }

  createStudent(student:Student):Observable<Student>{
  
      const httpOptions= {
          headers: new HttpHeaders({
              'Content-Type':'application/json',
              'Autohorization':'Token'
          }),
      }
      return this.http.post<Student>(this.url,student,httpOptions).pipe(
          tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)), // tap ile bu aiamada da veriyi alabiliyoruz
          catchError(this.handleError)
          );
  }

  updateStudent(id:number,student:Student):Observable<Student>{
  
      const httpOptions= {
          headers: new HttpHeaders({
              'Content-Type':'application/json',
              'Autohorization':'Token'
          }),
      }
      // member= JSON.parse(JSON.stringify(member));
      // 
      console.log(student)
      return this.http.put<Student>(this.url+"/"+id,student,httpOptions).pipe(
          tap(data=>console.log("Servis üzerinde pipe aracılığı ile gelen: "+data)),
          catchError(this.handleError),
          );
          
  }

  deleteStudent(id:number):Observable<boolean>{
  
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