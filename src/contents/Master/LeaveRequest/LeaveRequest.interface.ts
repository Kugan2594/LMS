interface ILeaveRequest {
    id?:number;
    employeeId?:number;
    leaveTypeId?: number;
    fromDate?: string;
    toDate?: string;
    reason?: string;
    days?: number;
    employee?: string;
    status?: "Approved" | "Reject" | "New";
    cancel?: any;
}

export type { ILeaveRequest };
