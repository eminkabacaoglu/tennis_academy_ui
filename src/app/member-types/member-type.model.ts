import { PaymentType } from './../payment-types/payment-type.model';
import { PersonType } from './../person/person-type.model';
export interface MemberType extends PersonType{
    paymentType:PaymentType

}