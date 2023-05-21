export interface ReservationSetting{
    id?:number;
    maxNumberOfDaysOwed:number;
    playerWaitingMinute:number;
    reservationBeginningTime:string;
    reservationEndingTime:string;
    reservationForwardDay:number;
    reservationForwardDayForTrainers:number;
    reservationCancellationPeriod:number;
    reservationCancellationPeriodTrainers:number;
    reservationPeriod:number;
    webReservationBeginningTime:string;
    webReservationEndingTime:string;
    minTimePeriod:number;
    maxReservationHour:number;
    maxReservationHourInPrimeTime:number;

}