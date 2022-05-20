interface ILeaveRequest {
    leaveType?: string;
    fromDate?: string;
    toDate?: string;
    reason?: string;
    days?: number;
    employee?: string;
    status?: "Approved" | "Reject" | "New";
    cancel?: any;
}

export type { ILeaveRequest };
