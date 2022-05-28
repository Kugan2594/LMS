interface ILeaveType {
  id?: number;
  type?: string;
  noticePeriod?: number;
  description?: string;
  cancellationNoticePeriod?: number;
  reginationNotified?: boolean;
  ableToCarryForward?: boolean;
  noticePeriodApplicable?: boolean;
  maxStretchDays?: number;
  minStretchDays?: number;
  yearCompleted?: boolean;
  noOfDaysPeryear?: number;
  monthlyApplicable?: boolean;
  noOfDays?: number;
  allocateDaysByAppointedDate?: boolean;
  startMonth?: number;
  endMonth?: number;
  days?: number;
  allocatedDaysByExtraWorking?: boolean,
  carryforwardCancellation?: number
}

export type { ILeaveType };
