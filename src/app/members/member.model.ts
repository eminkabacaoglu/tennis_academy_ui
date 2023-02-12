import { Person } from './../person/person.model';
export interface Member extends Person{
    job:string
    fatherName:string
    motherName:string
    dateOfMembershipBegin:Date
    dateOfMembershipEnd:Date
    membershipStatus:string
    memberType:string
    note:string

}