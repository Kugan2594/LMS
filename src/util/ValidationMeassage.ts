export const FORM_VALIDATION = {
  required: 'This field is required.',
  email: 'Email is not valid.',
  userEmail: 'Email is not valid.',
  mobileNumber: 'is not valid.',
  phoneNumber: 'is not valid.',
  seatCount: 'is not valid.',
  NicNumber: 'is not valid. "000000000V"',
  price: 'Price is not valid.',
  space: 'is not valid.',
  drivingLicenceNo: 'is not valid "X0000000X" or "X0000000"',
  passportNo:'is not valid "X0000000"'
};
export const EMAIL_VALIDATION = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
export const PHONE_VALIDATION =
  /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
export const NIC_VALIDATION = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
export const PRICE_VALIDATION = /^\d+(?:[.,]\d+)*$/gm;
export const spaceValidation = /^[^-\s]|-\s+$/;
export const numberValidation = /^[0-9]+([.][0-9]+)?$/;
export const numaricValidation = /^[0-9]+$/;
export const prefixValidation = /^[A-Z]{3}$/;
export const LICENCE_VALIDATION = /^([A-Z]{1}[0-9]{7}[A-Z]{1})|([A-Z]{1}[0-9]{7})$/;
export const PASSPORT_VALIDATION = /^([A-Z]{1}[0-9]{7})$/;


