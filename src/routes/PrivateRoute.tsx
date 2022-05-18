import { Suspense, lazy } from "react";
import { PartialRouteObject } from "react-router";
import ManageEmployee from "src/contents/Master/Employee/ManageEmployee";

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
    ],
  },
];

export default PrivateRoute;
