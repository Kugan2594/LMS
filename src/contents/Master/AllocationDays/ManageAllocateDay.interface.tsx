interface IEmployeeLeaveType {
    id?: string | number;
    employeeId?:string | number;
    leavetypeId?: string | number;
    firstName?: string;
    lastName?: string;
    type?: string;
    allocatedDays?: number;
    remainingDays?: number;
}

export type { IEmployeeLeaveType };