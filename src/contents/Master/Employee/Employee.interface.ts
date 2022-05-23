interface IEmployee {
  id?: number;
  address?: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth?: String;
  email?: string;
  gender?: string;
  contactNo?: string;
  nic?: string;
  maritalStatus?: string;
  nationality?: string;
  religon?: string;
  passportNo?: string;
  drivingLicenceNo?: string;
  bloodGroup?: string;

  approverStatus?: boolean;
  joinDate?: string;
  dateOfPermanency?: string;
  companyLocationId?: string | number;
  designationId?: string | number;
  employmentType?: string;
  businessUnit?: string;
}

export type { IEmployee };