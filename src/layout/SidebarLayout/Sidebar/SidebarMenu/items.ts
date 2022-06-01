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
    {
        name: "Notifications",
        icon: NotificationsRoundedIcon,
        link: "/master/notifications",
    },
    {
        name: "Settings",
        icon: SettingsIcon,
        link: "/master/companyLocation",
        items: [
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
        ],
    },
];

// if (!modulePermission(PERMISSION_NAME.role_permission).view) {
//   remove(permissionMenuItems, (item) => item.name === 'Role Permission');
// }

const menuItems: MenuItems[] = [
    {
        heading: "Master",
        items: masterMenuItems,
    },
];

export default menuItems;
