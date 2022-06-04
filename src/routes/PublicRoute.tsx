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
  const UserVerification = Loader(
    lazy(() => import('src/contents/login/UserVerification'))
  );

const PublicRoute: PartialRouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: `user-verification/:token`,
    element: <UserVerification />
  }

];

export default PublicRoute;
