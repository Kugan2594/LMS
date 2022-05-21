interface IEmployeeLeaveType {
    id?: number;
    employeeId?: number;
    leaveTypeId?: number;
    allocatedDays?: number;
    remainingDays?: number;
}

export type { IEmployeeLeaveType };