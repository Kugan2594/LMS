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
import { IoCarSportSharp } from "react-icons/io5";
import { GrSend, GrWaypoint, GrWifi } from "react-icons/gr";
import { IoSettingsSharp, IoAccessibilityOutline } from "react-icons/io5";
import { MdGpsFixed, MdEmojiPeople, MdPersonalInjury } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { RiRouteFill } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import { HiStar } from "react-icons/hi";

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
  { name: "Employee", icon: GiRibbonMedal, link: "/master/employee" },
{ name: "Leave Type", icon: GiRibbonMedal, link: "/master/leavetype" },
  {
    name: "Leave Request",
    icon: GrSend,
    link: "/master/leaveRequest",
  },
  {
    name: "Manage Leave Request",
    icon: HiStar,
    link: "/master/In-Progress",
  },
  { name: "History", icon: GiRibbonMedal, link: "/master/history" },
  { name: "E-History", icon: GiRibbonMedal, link: "/master/e-history" },
  { name: "Allocate Days", icon: GiRibbonMedal, link: "/master/allocateday" },
  { name: "My Tasks", icon: GiRibbonMedal, link: "/master/tasks" },
  { name: "Employee Approver", icon: GiRibbonMedal, link: "/master/employee/approver" },
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
