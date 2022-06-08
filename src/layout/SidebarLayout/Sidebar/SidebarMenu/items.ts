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
import { getPermissionStatus, getSubordinatePrivileges, sampleFuc } from "src/util/permissionUtils";
import { remove } from "lodash";
import { getPermissionStatus, getSubordinatePrivileges, getUserRolePermission, sampleFuc } from "src/util/permissionUtils";


const Employees = getPermissionStatus("Employees");
console.log("Employees", Employees);
const SubEmployee = getSubordinatePrivileges(Employees, "Employees");
console.log("Employees.status", sampleFuc(SubEmployee));
console.log("ADD Employee status", sampleFuc(SubEmployee).CREM);

const Approvers = getPermissionStatus("Approvers");
  console.log("Approvers", Approvers);
  const SubApprovers = getSubordinatePrivileges(Approvers, "Approvers");
  console.log("Approvers.status", sampleFuc(SubApprovers));
  console.log("ADD Approvers status", sampleFuc(SubApprovers).CREA);

  const LeaveTypes = getPermissionStatus("LeaveTypes");
  console.log("LeaveTypes", LeaveTypes);
  const SubLeaveTypes = getSubordinatePrivileges(LeaveTypes, "LeaveTypes");
  console.log("LeaveTypes.status", sampleFuc(SubLeaveTypes));
  console.log("ADD LeaveTypes status", sampleFuc(SubLeaveTypes).CRLT);

  const History = getPermissionStatus("History");
  console.log("History", History);
  const SubHistory = getSubordinatePrivileges(History, "History");
  console.log(" History .status", sampleFuc(SubHistory));

  const Holiday = getPermissionStatus("Holiday");
  console.log("Holiday", Holiday);
  const SubHolidays = getSubordinatePrivileges(Holiday, "Holiday");
  console.log(" Holiday .status", sampleFuc(SubHolidays));
  console.log("ADD Holiday status", sampleFuc(SubHolidays).CRHL);

  // SETTINGS
  const Settings = getPermissionStatus("Settings");
  console.log("Settings", Settings);
  // SETTINGS-DESIGNATION
  const SubDesignations = getSubordinatePrivileges(Settings, "Designations");
  console.log(" Settings .status", sampleFuc(SubDesignations));
  console.log("ADD Settings status", sampleFuc(SubDesignations).CRHL);

  // SETTINGS-Role
  const SubRoles = getSubordinatePrivileges(Settings, "Role");
  console.log("Settings .status", sampleFuc(SubRoles));
  console.log("ADD Settings status", sampleFuc(SubRoles).CRHL);

  // SETTINGS-EmploymentType
  const SubEmployementType = getSubordinatePrivileges(Settings, "EmploymentType");
  console.log("EmployementType.status", sampleFuc(SubEmployementType));
  console.log("ADD EmployementType status", sampleFuc(SubEmployementType).CRET);

   // SETTINGS-LOCATION
  const SubCompanyLocation = getSubordinatePrivileges(Settings, "Location");
  console.log(" Settings .status", sampleFuc(SubCompanyLocation));
  console.log("ADD Settings status", sampleFuc(SubCompanyLocation).CRHL);

    // SETTINGS-UNIT
    const SubBussinessUnit = getSubordinatePrivileges(Settings, "Unit");
    console.log("Settings .status", sampleFuc(SubBussinessUnit));
    console.log("ADD Settings status", sampleFuc(SubBussinessUnit).CRBU);

     // SETTINGS-USER PRIVILEGE

     //allocate leaves
     const AllocateLeaves = getPermissionStatus("AllocateLeaves");
     console.log("AllocateLeaves", AllocateLeaves);
     const SubAllocateLeaves = getSubordinatePrivileges(AllocateLeaves, "AllocateLeaves");



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

// const settings = getPermissionStatus("Settings");
// const subordinatePrivilegessettings = settings.subordinatePrivileges
// console.log("llllllllllllllllllllllll6666", settings.subordinatePrivileges);

// console.log("llllllllllllllllllllllll", settings);
// const subsettings = getSubordinatePrivileges(settings, "Designations");
// console.log("llllllllllllllllllllllll333", subsettings);


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
    { name: "Notifications", icon: NotificationsRoundedIcon, link: "/master/notifications", },
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
console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmm", getPermissionStatus("Settings"))
if (!getPermissionStatus("LeaveTypes").status) {
    remove(masterMenuItems, (item) => item.name === "Leave Types");
}
if (!getPermissionStatus("Employees").status) {
    remove(masterMenuItems, (item) => item.name === "Employees");
}
if (!getPermissionStatus("Approvers").status) {
    remove(masterMenuItems, (item) => item.name === "Approvers");
}
if (!getPermissionStatus("AllocateLeaves").status) {
    remove(masterMenuItems, (item) => item.name === "Allocate Leaves");
}
if (!getPermissionStatus("History").status) {
    remove(masterMenuItems, (item) => item.name === "History");
}
if (!getPermissionStatus("Holiday").status) {
    remove(masterMenuItems, (item) => item.name === "Holidays");
}
// if (!getPermissionStatus("Settings").status) {
//     remove(masterMenuItems, (item) => item.name === "Settings");
// }
// for (let i = 0; i < subordinatePrivilegessettings.length; i++) {
//     if (subordinatePrivilegessettings[i].name === "Role" &&!subordinatePrivilegessettings[i].status ) {
//         remove(masterMenuItems, (item) => item.items[0].name  === "Roles");}
    //     else if (subordinatePrivilegessettings[i].name === "Designations"&&!subordinatePrivilegessettings[i].status) {
    //     remove(masterMenuItems, (item) => item.items[1].name  === "Designations");
    // }else if (subordinatePrivilegessettings[i].name === "EmploymentType"&&!subordinatePrivilegessettings[i].status) {
    //     remove(masterMenuItems, (item) => item.items[2].name  === "Type");
    // }else if (subordinatePrivilegessettings[i].name === "Location"&&!subordinatePrivilegessettings[i].status) {
    //     remove(masterMenuItems, (item) => item.items[3].name  === "Location");
    // }else if (subordinatePrivilegessettings[i].name === "Unit"&&!subordinatePrivilegessettings[i].status) {
    //     remove(masterMenuItems, (item) => item.items[4].name  === "Unit");
    // }else if (subordinatePrivilegessettings[i].name === "UserPrivilege"&&!subordinatePrivilegessettings[i].status) {
    //     remove(masterMenuItems, (item) => item.items[5].name === "UserPrivilage");
   // }
// }

if (!sampleFuc(SubApprovers)) {
    remove(masterMenuItems, (item) => item.name === 'Approvers');
}

if (!sampleFuc(SubEmployee)) {
    remove(masterMenuItems, (item) => item.name === 'Employees');
}

if (!sampleFuc(SubLeaveTypes)) {
    remove(masterMenuItems, (item) => item.name === 'Leave Types');
}

if (!sampleFuc(SubAllocateLeaves)) {
    remove(masterMenuItems, (item) => item.name === '"Allocate Leaves');
}

if (!sampleFuc(SubHistory)) {
    remove(masterMenuItems, (item) => item.name === 'History');
}

if (!sampleFuc(SubHolidays)) {
    remove(masterMenuItems, (item) => item.name === 'Holidays');
}
console.log(!sampleFuc(SubHolidays));

if (!sampleFuc(SubDesignations)) {
    remove(masterMenuItems, (item) => item.name === 'Settings');
}

const menuItems: MenuItems[] = [
    {
        heading: "Master",
        items: masterMenuItems,
    },
];


export default menuItems;
