import { Country } from './../countries/country.model';
export interface City {
    id?:number
    cityName?:String,
    country?:Country,
    createdAt?: Date,
    lastModifiedAt?: Date,
    createdBy?: string,
    modifiedBy?: string,


}