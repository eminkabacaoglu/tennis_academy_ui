export interface Member{
    id:number;
    firstName:string;
    lastName:string;
    username:string;
    password:string;
    nationalId:number; //milisecond cinsinden tutuluyor
    dateOfBirth:Date;
    placeOfBirth:string;
    gender:string;
    mobilePhone:string;
    homePhone:string;
    photoUrl:string;
    city:string;
    county:string;
    email:string;
    createdAt:Date;
    createdBy:string;
    lastModifiedAt:Date;
    modifiedBy:string;
    webReservation:boolean;
    active:boolean;
    job:string
    fatherName:string
    motherName:string
    dateOfMembershipBegin:Date
    dateOfMembershipEnd:Date
    membershipStatus:string
    memberType:string
    note:string

}