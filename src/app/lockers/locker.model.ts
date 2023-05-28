import { LockerType } from "../locker-types/locker-type.model";
import { Member } from "../members/member.model";

export interface Locker{
    id?:number;
    lockerCode:string;
    duesFee:number;
    allocationFee:number;
    lockerType:LockerType;
    member:Member

}