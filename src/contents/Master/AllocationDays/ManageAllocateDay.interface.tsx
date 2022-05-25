interface IEmployeeLeaveType {
    id?: number;
    employeeId?:string | number;
    leaveTypeId?: string | number;
    firstName?: string;
    lastName?: string;
    type?: string;
    allocatedDays?: string | number;
    remainingDays?: string | number;
}

export type { IEmployeeLeaveType };