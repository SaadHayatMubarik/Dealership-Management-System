import * as moment from "moment";

export class DateUtils {
    static formatDate(date: Date, format: string) {
        // return moment().format(format)
        const now = moment(); // Create a new Moment.js object representing the current date and time
        const formattedDate = now.format('YYYY-MM-DD'); // Format the date using Moment.js
        console.log(formattedDate);
        return formattedDate;
    }
    static getStartOfMonth(date: Date) {
        return moment(date).startOf('month')
    }
    static getStartOfYear(date: Date) {
        return moment(date).startOf('year')
    }

    static getFirstDateOfMonth(month: number, year: number): Date {
        return new Date(year, month - 1, 1);
    }
    static getLastDateOfMonth(month: number, year: number): Date {
        return new Date(year, month, 0);
    }
    static isDateBetweenTwoDates(date: Date, startDate: Date, endDate: Date): boolean {
        return date >= startDate && date <= endDate;
    }

}