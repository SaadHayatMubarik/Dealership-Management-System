import { IObject, IOption } from "../interfaces/common";

export class CommonUtils {

    static monthList: IObject[] = [
        {
            name: 'January',
            shortForm: 'Jan',
            noOfDays: 31,
            monthValue: 1
        },
        {
            name: 'February',
            shortForm: 'Feb',
            noOfDays: 28,
            monthValue: 2
        },
        {
            name: 'March',
            shortForm: 'Mar',
            noOfDays: 31,
            monthValue: 3
        },
        {
            name: 'April',
            shortForm: 'Apr',
            noOfDays: 30,
            monthValue: 4
        },
        {
            name: 'May',
            shortForm: 'May',
            noOfDays: 31,
            monthValue: 5
        },
        {
            name: 'June',
            shortForm: 'Jun',
            noOfDays: 30,
            monthValue: 6
        },
        {
            name: 'July',
            shortForm: 'July',
            noOfDays: 31,
            monthValue: 7
        },
        {
            name: 'August',
            shortForm: 'Aug',
            noOfDays: 31,
            monthValue: 8
        },
        {
            name: 'September',
            shortForm: 'Sep',
            noOfDays: 30,
            monthValue: 9
        },
        {
            name: 'October',
            shortForm: 'Oct',
            noOfDays: 31,
            monthValue: 10
        },
        {
            name: 'November',
            shortForm: 'Nov',
            noOfDays: 30,
            monthValue: 11
        },
        {
            name: 'December',
            shortForm: 'Dec',
            noOfDays: 31,
            monthValue: 12
        }
    ]

    static getBpsList() {
        const bpsList: number[] = [];
        for (let i = 1; i <= 22; i++) {
            bpsList.push(i)
        }
        return bpsList;
    }
    static getBpsListOptions() {
        let bpsListOptions: IOption[] = [];
        this.getBpsList().forEach((res: number) => {
            bpsListOptions.push({ label: res + '', value: res })
        })
        return bpsListOptions;
    }
    static extensionMap: { [key: string]: string } = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        // Add more content types and their corresponding extensions as needed
    };

    static getYearList(year?: number) {
        year = year ?? new Date().getFullYear();
        let yearList: number[] = []
        for (let i = year - 5; i <= year + 1; i++) {
            yearList.push(i);
        }
        return yearList;
    }

    static getMonthOptions() {
        let monthOptions: IOption[] = [];
        this.monthList.forEach((res: IObject) => {
            monthOptions.push({ label: res['name'], value: res['monthValue'] })
        })
        return monthOptions;
    }
    static getYearListOptions() {
        let yearOptions: IOption[] = [];
        this.getYearList().forEach((res: number) => {
            yearOptions.push({ label: res + '', value: res })
        })
        return yearOptions;
    }
    static convertFileToBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result as string;
                resolve(base64Data.split(',')[1]);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }
}