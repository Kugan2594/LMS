/**
 * @author Lingeswaran Sivapiriyan
 * @email l.s.piriyan@gmail.com
 * @create date 2021-12-20 17:06:04
 * @modify date 2021-12-20 17:06:04
 * @desc [description]
 */
import { ReactNode } from "react";
import { FaRoute } from "react-icons/fa";
import { GiSteeringWheel, GiRibbonMedal } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { CgUserList } from "react-icons/cg";
import { IoCarSportSharp } from "react-icons/io5";
import { GrSend, GrWaypoint, GrWifi } from "react-icons/gr";
import { FaUserAlt, FaUserCheck } from "react-icons/fa";
import { IoSettingsSharp, IoAccessibilityOutline } from "react-icons/io5";
import { MdGpsFixed, MdEmojiPeople, MdPersonalInjury } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { FcLeave } from "react-icons/fc";
import { RiRouteFill } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
import { IoIosWoman, IoLogoOctocat, IoMdDoneAll } from "react-icons/io";

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
    { name: "Employee", icon: FaUserAlt, link: "/master/employee" },
    {
        name: "Leave Request",
        icon: GrSend,
        link: "/master/leaveRequest",
    },
    { name: "Designations", icon: IoIosWoman, link: "/master/designations" },
    { name: "Leave Type", icon: GiRibbonMedal, link: "/master/leavetype" },
    { name: "History", icon: GrHistory, link: "/master/history" },
    { name: "E-History", icon: CgUserList, link: "/master/e-history" },
    { name: "Allocate Days", icon: GiRibbonMedal, link: "/master/allocateday" },
    { name: "My Tasks", icon: FcLeave, link: "/master/tasks" },
    {
        name: "Manage Leave Request",
        icon: HiStar,
        link: "/master/In-Progress",
    },
    {
        name: "Employee Approver",
        icon: FaUserCheck,
        link: "/master/empApprover",
    },
    { name: "Employement Type", icon: IoIosWoman, link: "/master/employementType" },
    
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
