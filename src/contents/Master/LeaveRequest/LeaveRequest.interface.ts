interface ILeaveRequest {
    id?: number;
    employeeId?: number | string;
    leaveTypeId?: number | string;
    leaveType?: string;
    fromDate?: string;
    toDate?: string;
    reason?: string;
    days?: number | string;
    employee?: string;
    status?: "Approved" | "Reject" | "New";
    cancel?: any;
    enableTitle?: boolean;
    isButton?: boolean;
    isButtonTwo?: boolean;
    isButtonThree?: boolean;
    reloadTable?: any;
    action?: any;
    editData?: any;
    handleError?: any;
}

export type { ILeaveRequest };
