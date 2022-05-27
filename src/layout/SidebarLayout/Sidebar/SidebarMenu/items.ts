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
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import SafetyDividerRoundedIcon from "@mui/icons-material/SafetyDividerRounded";

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
  { name: "Designations", icon: WorkRoundedIcon, link: "/master/designations" },
  {
    name: "Approver",
    icon: SafetyDividerRoundedIcon,
    link: "/master/employee/approver",
  },
  // { name: "Apply Leave", icon: SendRoundedIcon, link: "/master/leaveRequest",},
  {
    name: "Leave Types",
    icon: FormatListBulletedRoundedIcon,
    link: "/master/leavetype",
  },
  {
    name: "Allocate Leaves",
    icon: DonutSmallRoundedIcon,
    link: "/master/allocateday",
  },
  // { name: "History", icon: HistoryRoundedIcon, link: "/master/history" },
  { name: "History", icon: HistoryRoundedIcon, link: "/master/e-history" },
  // { name: "My Tasks", icon: TaskAltRoundedIcon, link: "/master/tasks" },
  // { name: "Leave Requests", icon: LocalPostOfficeRoundedIcon, link: "/master/In-Progress",},
  { name: "BusinessUnit", icon: IoIosWoman, link: "/master/businessUnit" },
  { name: "Holidays", icon: IoIosWoman, link: "/master/holidays" },
  {
    name: "Employement Type",
    icon: IoIosWoman,
    link: "/master/employementType",
  },
  { name: "Company Location", icon: FcLeave, link: "/master/companyLocation" },
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
