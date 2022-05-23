interface IEmployeeLeaveType {
    id?: number;
    employeeId?: any;
    firstName?: string;
    lastName?: string;
    type?: string;
    allocatedDays?: string;
    remainingDays?: string;
}

export type { IEmployeeLeaveType };