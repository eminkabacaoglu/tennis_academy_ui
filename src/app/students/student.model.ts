import { StudentType } from './../student-types/student-type.model';
import { Person } from './../person/person.model';
export interface Student extends Person{
    school?:string
    fatherName?:string
    motherName?:string
    parentNameSurname?:string
    parentJob?:string
    parentWorkPlace?:string
    alternativeParent?:string
    dateOfRegisteration?:Date
    studentType?:StudentType
    attendanceType?:string

}