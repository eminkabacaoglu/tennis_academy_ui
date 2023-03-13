import { MemberType } from './../member-types/member-type.model';
import { MembershipStatus } from './../membership-status/membership-status.model';
import { Person } from './../person/person.model';
export interface Member extends Person{
    job?:string
    fatherName?:string
    motherName?:string
    dateOfMembershipBegin?:Date
    dateOfMembershipEnd?:Date
    membershipStatus?:MembershipStatus
    memberType?:MemberType
    note?:string

}