interface IEmployeeLeaveType {
    id?: number;
    employeeId?: string;
    firstName?: string;
    lastName?: string;
    type?: string;
    allocatedDays?: string;
    remainingDays?: string;
}

export type { IEmployeeLeaveType };