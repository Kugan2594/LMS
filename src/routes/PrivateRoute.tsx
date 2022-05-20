import { Suspense, lazy } from "react";
import { PartialRouteObject } from "react-router";
import ManageEmployee from "src/contents/Master/Employee/ManageEmployee";
import InProgress from "src/contents/Master/LeaveRequest/InProgress";
import LeaveRequest from "src/contents/Master/LeaveRequest/LeaveRequest";
import ManageType from "src/contents/Master/LeaveType/ManageType";

import SuspenseLoader from "../components/molecules/SuspenseLoader";
import Dashboard from "../contents/Dashboard";
import Login from "../contents/login/Login";
import SidebarLayout from "../layout/SidebarLayout";

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
        ],
    },
];

export default PrivateRoute;
