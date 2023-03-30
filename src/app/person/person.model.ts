import { City } from "../cities/city.model";

export interface Person{
    id?:number;
    firstName?:string;
    lastName?:string;
    username?:string;
    password?:string;
    nationalId?:string;
    dateOfBirth?:Date;
    placeOfBirth?:string;
    gender?:string;
    mobilePhone?:string;
    homePhone?:string;
    photoUrl?:string;
    city?:City;
    county?:string;
    email?:string;
    createdAt?:Date;
    createdBy?:string;
    lastModifiedAt?:Date;
    modifiedBy?:string;
    webReservation?:boolean;
    active?:boolean;

}