import { Injectable } from "@angular/core";

declare let alertify:any;
alertify.set('notifier','position', 'top-right');
alertify.set('notifier','delay', 2);


// @Injectable() // bu şekilde tanımlana da bilir bunu yaparsak app.module içindeki providers kısmına bu sınıfı eklemek gerekir

@Injectable({
    providedIn:"root" // bu şekilde yazarsak global bir servis olarak tanımlarız her yerden erişilir
})
export class AlertifyService{
    constructor(){}
    
    success(message:string){
        alertify.success(message)
    }

    error(message:string){
        alertify.error(message)
    }

    warning(message:string){
        alertify.warning(message)
    }
}