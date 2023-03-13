import { StudentType } from './../student-types/student-type.model';
import { Person } from './../person/person.model';
export interface Member extends Person{
    school?:string
    fatherName?:string
    motherName?:string
    dateOfMembershipBegin?:Date
    dateOfMembershipEnd?:Date
    studentType?:StudentType

}