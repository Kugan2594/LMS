import moment from "moment";

interface INotification {
    shortmsg?: string;
    employeeNmae?: string;
    date?: string;
    key?: string;
    isTitle?: boolean;
    isDivider?: boolean;
}
export default INotification;
