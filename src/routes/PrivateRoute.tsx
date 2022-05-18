import { Suspense, lazy } from "react";
import { PartialRouteObject } from "react-router";

import SuspenseLoader from "../components/molecules/SuspenseLoader";
import Login from "../contents/login/Login";

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
];

export default PrivateRoute;
