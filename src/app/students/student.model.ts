import { StudentType } from './../student-types/student-type.model';
import { Person } from './../person/person.model';
import { Level } from '../levels/level.model';
export interface Student extends Person{
    school?:string
    fatherName?:string
    motherName?:string
    parentNameSurname?:string
    parentJob?:string
    parentWorkPlace?:string
    alternativeParent?:string
    dateOfRegistration?:Date
    studentType?:StudentType
    level?:Level
    inBlackList?:boolean;
    blackListDescription?:string;
    attendanceType?:string

}