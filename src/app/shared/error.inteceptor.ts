import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from "@angular/common/http";
import { Observable,throwError,catchError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError((response:HttpErrorResponse)=>{
                let message = "Hata oldu interceptor"
                
                if(!navigator.onLine){ //clientın interneti var mı diye kontrol eder
                    message = "Internet Bağlantınız yok";
                    return throwError(message);
                }

                if(response.error.error){
                    if(response.status === 401){
                        message = "Yetkiniz Yok"
                        return throwError(message);
                    }
                }
        
                if(response.error.error){
                    switch(response.error.error.message){
                        case "EMAIL_EXISTS":
                            message="Bu email adresi önceden kullanılmış"
                            break;
                        case "EMAIL_NOT_FOUND":
                            message="Email adresi bulunamadı"
                            break;
                        case "INVALID_PASSWORD":
                            message="Hatalı parola"
                            break;
                    };
                }

                return throwError(message);
            })
        );

    }

}