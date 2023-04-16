import { FieldType } from "../field-types/field-type.model";

export interface Field{
    id?:number;
    fieldCode:string;
    fieldName:string;
    fieldDescription?:string;
    active:boolean;
    webActive:boolean;
    fieldType:FieldType

}