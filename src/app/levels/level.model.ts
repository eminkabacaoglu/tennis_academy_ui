import { ModuleType } from "../module-types/module-type.model";

export interface Level{
    id?:number;
    levelCode:string;
    levelDescription:string;
    quota:number;
    moduleType:ModuleType

}