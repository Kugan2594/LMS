/**
 * @author Lingeswaran Sivapiriyan
 * @email l.s.piriyan@gmail.com
 * @create date 2021-12-20 17:06:04
 * @modify date 2021-12-20 17:06:04
 * @desc [description]
 */
import { ReactNode } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import SafetyDividerRoundedIcon from "@mui/icons-material/SafetyDividerRounded";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import { remove } from "lodash";
import { getPermissionStatus, getPermissionStatusMain, getSubordinatePrivileges, getUserRolePermission, sampleFuc } from "src/util/permissionUtils";


export interface MenuItem {
    id?: string;
    link?: string;
    icon?: any;
    badge?: string;
    items?: MenuItem[];
    name: string;
}

export interface MenuItems {
    items: MenuItem[];
    heading: string;
}

var userPermissionData = [];
userPermissionData = getUserRolePermission();

const Employee =
    userPermissionData &&
    getPermissionStatusMain("Employees", userPermissionData);
    console.log(userPermissionData);
 
console.log("**********************************");
console.log(Employee);
console.log("**********************************");

const masterMenuItems: MenuItem[] = [

    { name: "Employees", icon: PersonRoundedIcon, link: "/master/employee" },
    {
        name: "Approvers",
        icon: SafetyDividerRoundedIcon,
        link: "/master/approver",
    },
    // { name: "Apply Leave", icon: SendRoundedIcon, link: "/master/leaveRequest",},
    {
        name: "Leave Types",
        icon: FormatListBulletedRoundedIcon,
        link: "/master/leavetype",
    },
    {
        name: "Allocate Leaves",
        icon: DonutLargeRoundedIcon,
        link: "/master/allocateday",
    },
    // { name: "History", icon: HistoryRoundedIcon, link: "/master/history" },
    { name: "History", icon: HistoryRoundedIcon, link: "/master/e-history" },
    { name: "Holidays", icon: InsertInvitationIcon, link: "/master/holidays" },
    // { name: "In Progress", icon: TaskAltRoundedIcon, link: "/master/In-Progress" },
    // { name: "Leave Requests", icon: LocalPostOfficeRoundedIcon, link: "/master/In-Progress",},
    // { name: "Lieu Request", icon: AddCircleOutlineRoundedIcon, link: "/master/lieurequest" },
     {name: "Notifications", icon: NotificationsRoundedIcon, link: "/master/notifications",},
    {
        name: "Settings",
        icon: SettingsIcon,
        link: "/master/companyLocation",
        items: [
            {
                name: "Roles",
                icon: BusinessCenterRoundedIcon,
                link: "/master/roles",
            },
            {
                name: "Designations",
                icon: BusinessCenterRoundedIcon,
                link: "/master/designations",
            },
            {
                name: "Type",
                icon: BadgeRoundedIcon,
                link: "/master/employementType",
            },
            {
                name: "Location",
                icon: LocationOnRoundedIcon,
                link: "/master/companyLocation",
            },
            {
                name: "Unit",
                icon: GroupWorkRoundedIcon,
                link: "/master/businessUnit",
            },
            {
                name: "UserPrivilage",
                icon: GroupWorkRoundedIcon,
                link: "/master/userPrivilege",
            },
        ],
    },
];



// if (Approvers.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Approvers');
// }


// //  console.log(!sampleFuc(SubEmployee));

// //  ProjectAllocation.status &&
// //                     sampleFuc(SubProjectAllocation).VIPR &&
// // if (false) {
// //     remove(masterMenuItems, (item) => item.name === 'Employees');
// // }


// if (LeaveTypes.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Leave Types');
// }

// if (AllocateLeaves.status===false) {
//     remove(masterMenuItems, (item) => item.name === '"Allocate Leaves');
// }

// if (History.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'History');
// }

// if (Holiday.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Holidays');
// }

// if (Settings.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Settings');
// }

// if (Holiday.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Holidays');
// }

// if (AllocateLeaves.status===false) {
//     remove(masterMenuItems, (item) => item.name === 'Allocate Leaves');
// }

const menuItems: MenuItems[] = [
    {
        heading: "Master",
        items: masterMenuItems,
    },
];

if (!Employee.status) {
    remove(masterMenuItems, (item) => item.name === "Employees");
}
export default menuItems;
