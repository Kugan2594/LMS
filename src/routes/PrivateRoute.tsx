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
        path: "/history",
        element: <ManageHistory />,
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
        path: "/allocateday",
        element: <ManageAllocateDay />,
      },
      {
        path: "/employee/approver",
        element: <ManageEmployeeApprover />,
      },
    ],
  },
];

export default PrivateRoute;
