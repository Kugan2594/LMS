import { Suspense, lazy } from "react";
import { PartialRouteObject } from "react-router";
import ManageAllocateDay from "src/contents/Master/AllocationDays/ManageAllocateDay";
import ManageEmployee from "src/contents/Master/Employee/ManageEmployee";
import ManageHistory from "src/contents/Master/History/ManageHistory";
import ManageType from "src/contents/Master/LeaveType/ManageType";
import EHistory from "src/contents/Master/E-History/EHistory";

import SuspenseLoader from "../components/molecules/SuspenseLoader";
import Dashboard from "../contents/Dashboard";
import Login from "../contents/login/Login";
import SidebarLayout from "../layout/SidebarLayout";
import LeaveRequest from "src/contents/Master/LeaveRequest/LeaveRequest";
import InProgress from "src/contents/Master/LeaveRequest/InProgress";
import ManageCompanyLocation from "src/contents/Master/CompanyLocation/ManageCompanyLocation";

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
                element: <ManageType />,
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
        ],
    },
];

export default PrivateRoute;
