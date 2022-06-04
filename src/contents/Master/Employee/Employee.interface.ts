interface IEmployee {
  id?: number;
  empId?: string;
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
  employmentTypeId?: string | number;
  businessUnitId?: string | number;
  roleId?: string | number;
}

export type { IEmployee };