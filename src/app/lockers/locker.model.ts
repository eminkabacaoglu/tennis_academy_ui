import { LockerType } from "../locker-types/locker-type.model";

export interface Locker{
    id?:number;
    lockerCode:string;
    duesFee:number;
    allocationFee:number;
    lockerType:LockerType

}