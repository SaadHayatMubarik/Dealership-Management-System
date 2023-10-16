import { ValueType } from "../enums/enums";

export interface IBase {
    createdAt?: Date;
    createdBy?: number;
    deleted?: boolean;
    updatedAt?: Date;
    updatedBy?: number;

}
export interface IDepartment extends IBase {

    departmentId: number;
    departmentName: string;
    isParent: boolean;
    parentId: number;

}
export interface IDesignation extends IBase {

    designationId: number;
    designationName: string;

}

export interface IDepartmentDesignation {
    departmentId?: number;
    designationId?: number;
    employeeCapacity?: number;
    bpsList?: (string | number | null | undefined)[];
}
export interface IDepartmentDesignationBps extends IBase {
    departmentDesignationBpsId?: number;
    bpsNumber?: number;
    employeeCapacity: number;
}

export interface IAllowanceType extends IBase {
    allowanceTypeId: number;
    allowanceType: string;
}

export interface IAllowance extends IBase {
    allowanceId: number;
    allowanceName: string;
    allowanceCode: string;
    allowanceTypeId: number;
    allowanceTypeName: string;
    allowanceType?: IAllowanceType;
    affectedByEarnedLeaves: boolean;
    affectedBySuspension: boolean;
    isAsset: boolean;
    bpsFrom: number;
    bpsTo: number;
    startDate: any;
    endDate: any;
    orderSequence: number;
    value: number;
    valueType: ValueType;
}

export interface IBank extends IBase {
    bankId: number;
    bankName: string;
    branchName: string;
    branchCode: string;
    contactPerson: string;
    accountNumber: string;
}

export interface IShift extends IBase {
    shiftId: number;
    shiftName: string;
    shiftStartTime: Date;
    shiftEndTime: Date;
    lateTime: Date;
    halfDayTime: Date;
    lastAllowedTime: Date;
    defaultCheckinTime: Date;
    defaultCheckoutTime: Date;
}

export interface IFiscalYear extends IBase {
    fiscalYearId: number;
    startDate: string;
    endDate: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
}
export interface IEmployeeType extends IBase {
    employeeTypeId: number;
    employeeTypeName: string;
}
export interface ITaxSlab extends IBase {
    taxSlabId: number;
    fiscalYearId: number;
    startRange: number;
    endRange: number;
    deductionPercentage: number;
    fixDeduction: number;
}
export interface IBpsVersion extends IBase {
    bpsVersionId: number;
    versionName: string;
    startDate: string;
    endDate: string;
    orderImage: string;
}

export interface IBps extends IBase {
    bpsId: number;
    bpsNumber: number;
    bpsVersionId: number;
    minSalary: number;
    maxSalary: number;
    incrementAmount: number;
    maxStage: number;
}

export interface IRule extends IBase {
    ruleId: number;
    ruleName: string;
    publicHolidayOn: boolean;
    mondayOn: boolean;
    tuesdayOn: boolean;
    wednesdayOn: boolean;
    thursdayOn: boolean;
    fridayOn: boolean;
    saturdayOn: boolean;
    sundayOn: boolean;
}
export interface IAttendanceDevice extends IBase {
    deviceId: number;
    deviceName: string;
    password: string;
}
export interface IPostingLocation extends IBase {
    postingLocationId: number;
    locationTitle: string;
    locationDescription: string;
}
export interface IDeduction extends IBase {
    deductionId: number;
    deductionName: string; 
    deductionCode: string;
    orderSequence: number;
}