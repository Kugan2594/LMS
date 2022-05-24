import { type } from "os";

interface IDesignations {
    leaveType?: string;
    fromDate?: string;
    toDate?: string;
    reason?: string;
    days?: number;
    employee?: string;
    status?: "Approved" | "Reject" | "New";
    cancel?: any;
    enableTitle?: boolean;
    isButton?: boolean;
    isButtonTwo?: boolean;
    isButtonThree?: boolean;
    isButtonFour?: boolean;
}
export type { IDesignations };
