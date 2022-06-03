import { Suspense, lazy } from "react";
import { PartialRouteObject } from "react-router";
import ManageAllocateDay from "src/contents/Master/AllocationDays/ManageAllocateDay";
import ManageEmployee from "src/contents/Master/Employee/ManageEmployee";
import ManageLeaveType from "src/contents/Master/LeaveType/ManageLeaveType";
import ManageHistory from "src/contents/Master/History/ManageHistory";
import EHistory from "src/contents/Master/E-History/EHistory";

import SuspenseLoader from "../components/molecules/SuspenseLoader";
import Dashboard from "../contents/Dashboard";
import Login from "../contents/login/Login";
import SidebarLayout from "../layout/SidebarLayout";
import ManageEmployeeApprover from "src/contents/Master/EmployeeApprover/ManageEmployeeApprover";
import LeaveRequest from "src/contents/Master/LeaveRequest/LeaveRequest";
import InProgress from "src/contents/Master/LeaveRequest/InProgress";
import Task from "src/contents/Master/Tasks/ManageTask";
import ManageDesignations from "src/contents/Master/Designations/ManageDesignations";
import ManageHolidays from "src/contents/Master/Holidays/ManageHolidays";
import ManageBusinessUnit from "src/contents/Master/BusinessUnit/ManageBusinessUnit";
import ManageCompanyLocation from "src/contents/Master/CompanyLocation/ManageCompanyLocation";
import ManageEmployementType from "src/contents/Master/EmployementType/ManageEmployementType";
import UserPrivilege from "src/contents/Master/PrivilegeComponent/UserPrivilege";
import Profile from "src/contents/profile/Profile";


import { element } from "prop-types";

import ManageLieuRequest from "src/contents/Master/LieuRequest/ManageLieuRequest";
import ManageNotification from "src/contents/Master/Notification/ManageNotification";
const Loader = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const PrivateRoute: PartialRouteObject[] = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "profile",
        element: <SidebarLayout />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
           
        ]
    },
    {
        path: "master",
        element: <SidebarLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/employee",
                element: <ManageEmployee />,
            },

            {
                path: "/leaveRequest",
                element: <LeaveRequest />,
            },
            {
                path: "/In-Progress",
                element: <InProgress />,
            },
            {
                path: "/leavetype",
                element: <ManageLeaveType />,
            },
            {
                path: "/e-history",
                element: <EHistory />,
            },
            {
                path: "/history",
                element: <ManageHistory />,
            },
            {
                path: "/allocateday",
                element: <ManageAllocateDay />,
            },
            {
                path: "/companyLocation",
                element: <ManageCompanyLocation />,
            },
            {
                path: "/tasks",
                element: <Task />,
            },
            {
                path: "/designations",
                element: <ManageDesignations />,
            },
            {
                path: "/approver",
                element: <ManageEmployeeApprover />,
            },
            {
                path: "/lieurequest",
                element: <ManageLieuRequest />,
            },
            {
                path: "/businessUnit",
                element: <ManageBusinessUnit />,
            },
            {
                path: "/holidays",
                element: <ManageHolidays />,
            },
            {
                path: "/employementType",
                element: <ManageEmployementType />,
            },
            {
                path: "/notifications",
                element: <ManageNotification />,
            },
            
            { path: "/userPrivilege", element: <UserPrivilege /> },
        ],
    },
];

export default PrivateRoute;
