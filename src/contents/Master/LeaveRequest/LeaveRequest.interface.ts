interface ILeaveRequest {
    id?: number;
    employeeId?: string | number;
    leaveTypeId?: string | number;
    fromDate?: string;
    toDate?: string;
    reason?: string;
    leaveDays?: number | string;
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
